import { UserEntity } from "../domain/user.schema"
import { PostEntity } from "../domain/user.postSchema"
import { Post } from "../../../shared/interfaces/userPost.interface"
import mongoose, { Types } from "mongoose"

/**
 * UserPostDataAccess class for handling user post related operations
 */
export class UserPostDataAccess {
  /**
   * Create a new post for a user and return the created post
   * @param userId - The ID of the user
   * @param postData - The data of the post to be created
   * @returns The created post
   */
  async createPost(userId: Types.ObjectId, postData: Post): Promise<Post> {
    try {
      // Ensure userId is a valid ObjectId
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
      }

      // Create the post and return it
      const post = await PostEntity.create(postData)
      await UserEntity.findByIdAndUpdate(userId, { $push: { postIds: post._id } })
      return post
    } catch (error: any) {
      console.error(`Error in post creation: ${error.message}`)
      throw new Error("Error in post creation")
    }
  }

  /**
   * Get posts for a specific user and return the posts
   * @param id - The ID of the user
   * @param skip - The number of posts to skip (default is 0)
   * @returns The posts of the user
   */
  async getUserPosts(id: Types.ObjectId, skip: number = 0): Promise<Array<Post>> {
    try {
      // Ensure id is a valid ObjectId
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid user id")
      }

      // Aggregation pipeline to retrieve user posts
      const postsResult = await UserEntity.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        { $unwind: "$postIds" },
        { $sort: { postIds: -1 } },
        { $skip: skip },
        { $limit: 6 },
        { $group: { _id: null, postIds: { $push: "$postIds" } } },
        {
          $project: {
            _id: 0,
            postIds: 1,
          },
        },
      ])

      const { postIds } = postsResult[0] || { postIds: [] }

      // Find and return the user's posts
      const posts = await PostEntity.find({ _id: { $in: postIds } }).sort({ _id: -1 })
      return posts
    } catch (error: any) {
      console.error(`Error fetching user posts: ${error.message}`)
      throw new Error("Error fetching user posts")
    }
  }

  /**
   * Like a post
   * @param userId - The ID of the user who likes the post
   * @param postId - The ID of the post to be liked
   */
  async likePost(userId: Types.ObjectId, postId: Types.ObjectId) {
    try {
      // Ensure both userId and postId are valid ObjectId values
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid userId or postId")
      }

      // Add the user's ID to the 'usersLiked' array of the post and increment likes count by one
      await PostEntity.findByIdAndUpdate(postId, { $push: { usersLiked: userId }, $inc: { "actions.likes": 1 } })
    } catch (error: any) {
      console.error(`Error liking post: ${error.message}`)
      throw new Error("Error liking post")
    }
  }

  /**
   * Unlike a post
   * @param userId - The ID of the user who unlikes the post
   * @param postId - The ID of the post to be unliked
   */
  async unlikePost(userId: Types.ObjectId, postId: Types.ObjectId) {
    try {
      // Ensure both userId and postId are valid ObjectId values
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid userId or postId")
      }

      // remove the user's ID to the 'usersLiked' array of the post and decrement likes count by one
      await PostEntity.findByIdAndUpdate(postId, { $pull: { usersLiked: userId }, $inc: { "actions.likes": -1 } })
    } catch (error: any) {
      console.error(`Error unliking post: ${error.message}`)
      throw new Error("Error unliking post")
    }
  }
}
