import { UserEntity } from "../domain/user.schema"
import { PostEntity } from "../domain/user.postSchema"
import { Post } from "../../../shared/interfaces/userPost.interface"
import mongoose, { Types } from "mongoose"
import { CommentEntity } from "../domain/post.commentSchema"

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

  /**
   * Create a new comment for a post and return the created comment
   * @param postId - The ID of the post to be commented
   * @param postData - The comment data
   */
  async comment(postId: Types.ObjectId, postData: Post) {
    try {
      // Ensure userId is a valid ObjectId
      if (!Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid userId")
      }

      // Create the post and return it
      const comment = await CommentEntity.create(postData)
      await PostEntity.findByIdAndUpdate(postId, { $push: { replies: comment._id } })
      return comment
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
  async getComments(postId: Types.ObjectId, skip: number = 0): Promise<Array<Post>> {
    try {
      // Ensure id is a valid ObjectId
      if (!Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid user id")
      }

      // Aggregation pipeline to retrieve user posts
      const postsResult = await PostEntity.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(postId) } },
        { $unwind: "$replies" },
        { $sort: { replies: -1 } },
        { $skip: skip },
        { $limit: 6 },
        { $group: { _id: null, replies: { $push: "$replies" } } },
        {
          $project: {
            _id: 0,
            replies: 1,
          },
        },
      ])

      console.log(postsResult, 165);
      

      const { replies } = postsResult[0] || { postIds: [] }

      // Find and return the user's posts
      const comments = await CommentEntity.find({ _id: { $in: replies } }).sort({ _id: -1 })
      return comments
    } catch (error: any) {
      console.error(`Error fetching user posts: ${error.message}`)
      throw new Error("Error fetching user posts")
    }
  }
}
