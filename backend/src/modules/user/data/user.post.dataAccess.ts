import { Types } from "mongoose"

import { UserEntity } from "../domain/user.schema"
import { PostEntity } from "../domain/user.postSchema"
import { FeedPost, Post, PostResponse } from "../../../shared/interfaces/userPost.interface"

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
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
      }

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
  async getUserPosts(id: Types.ObjectId, skip: number = 0): Promise<Post[]> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid user id")
      }
      const post = await UserEntity.aggregate([
        { $match: { _id: new Types.ObjectId(id) } },
        {
          $project: {
            postIds: 1,
          },
        },
        { $lookup: { from: "posts", localField: "postIds", foreignField: "_id", as: "posts" } },
        {
          $unwind: "$posts",
        },
        {
          $project: {
            posts: 1,
          },
        },
        {
          $sort: { "posts._id": -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: 6,
        },
        { $group: { _id: "$_id", posts: { $push: "$posts" } } },
      ])

      return post[0]?.posts || []
    } catch (error: any) {
      console.error(`Error fetching user posts: ${error.message}`)
      throw new Error("Error fetching user posts")
    }
  }

  /**
   * Get posts for a specific user and return the posts
   * @param id - The ID of the user
   * @param skip - The number of posts to skip (default is 0)
   * @returns The posts of the user
   */
  async getFeedPosts(id: Types.ObjectId, skip: number = 0): Promise<FeedPost[]> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid user id")
      }
      const userFriendsAndPosts = await UserEntity.aggregate([
        { $match: { _id: new Types.ObjectId(id) } },
        { $project: { friends: 1, postIds: 1 } },
        { $unwind: "$friends" },
        { $lookup: { from: "users", localField: "friends", foreignField: "_id", as: "friendDetails" } },
        { $unwind: "$friendDetails" },
        { $project: { "friendDetails.postIds": 1 } },
        { $unwind: "$friendDetails.postIds" },
        { $group: { _id: "$_id", postIdsAllUsers: { $push: "$friendDetails.postIds" } } },
        { $unwind: "$postIdsAllUsers" },
        { $sort: { postIdsAllUsers: -1 } },
        { $skip: skip },
        { $limit: 10 },
        { $lookup: { from: "posts", localField: "postIdsAllUsers", foreignField: "_id", as: "posts" } },
        { $unwind: "$posts" },
        { $lookup: { from: "users", localField: "posts.userId", foreignField: "_id", as: "postUser" } }, // Add this lookup stage
        { $unwind: "$postUser" }, // Unwind the postUser array
        { $addFields: { "posts.userName": "$postUser.userName", "posts.name": "$postUser.name", "posts.profilePicture": "$postUser.profilePicture" } }, // Add the userName to each post
        { $sort: { "posts._id": -1 } },
        { $group: { _id: "$_id", posts: { $push: "$posts" } } },
      ])

      return userFriendsAndPosts[0]?.posts || []
    } catch (error: any) {
      console.error(`Error fetching user posts: ${error.message}`)
      throw new Error("Error fetching user posts")
    }
  }

  /**
   * Get post with id
   * @param postId - The ID of the post
   * @returns the post requested
   */
  async getUserPost(postId: Types.ObjectId): Promise<PostResponse> {
    try {
      if (!Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid post id")
      }

      const post = await PostEntity.findById(postId)
      if (!post) throw new Error("Post fetch failed")
      const userData = await UserEntity.findById(post.userId).select("profilePicture name userName")
      if (!userData) throw new Error("Cannot find user")
      const { profilePicture, name, userName } = userData
      return { post, profilePicture, name, userName }
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
  async likePost(userId: Types.ObjectId, postId: Types.ObjectId): Promise<void> {
    try {
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid userId or postId")
      }

      const userLiked = await PostEntity.findOne({
        _id: postId,
        usersLiked: { $in: [userId] },
      })

      if (!userLiked) {
        await PostEntity.findByIdAndUpdate(postId, {
          $addToSet: { usersLiked: userId },
          $inc: { "actions.likes": 1 },
        })
      }
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
  async unlikePost(userId: Types.ObjectId, postId: Types.ObjectId): Promise<void> {
    try {
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid userId or postId")
      }

      const userLiked = await PostEntity.findOne({
        _id: postId,
        usersLiked: { $in: [userId] },
      })

      if (userLiked) {
        await PostEntity.findByIdAndUpdate(postId, {
          $pull: { usersLiked: userId },
          $inc: { "actions.likes": -1 },
        })
      }
    } catch (error: any) {
      console.error(`Error unliking post: ${error.message}`)
      throw new Error("Error unliking post")
    }
  }

  /**
   * Unlike a post
   * @param userId - The ID of the user who unlikes the post
   * @param postId - The ID of the post to be unliked
   */
  async removeBookmark(userId: Types.ObjectId, postId: Types.ObjectId): Promise<void> {
    try {
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid userId or postId")
      }

      const userLiked = await PostEntity.findOne({
        _id: postId,
        usersSaved: { $in: [userId] },
      })

      if (userLiked) {
        await PostEntity.findByIdAndUpdate(postId, {
          $pull: { usersSaved: userId },
          $inc: { "actions.bookmarks": -1 },
        })
      }
      await UserEntity.findByIdAndUpdate(userId, { $pull: { savedPosts: postId } })

    } catch (error: any) {
      console.error(`Error unliking post: ${error.message}`)
      throw new Error("Error unliking post")
    }
  }

  /**
   * Like a post
   * @param userId - The ID of the user who likes the post
   * @param postId - The ID of the post to be liked
   */
  async bookmark(userId: Types.ObjectId, postId: Types.ObjectId): Promise<void> {
    try {
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid userId or postId")
      }

      const userLiked = await PostEntity.findOne({
        _id: postId,
        usersSaved: { $in: [userId] },
      })

      if (!userLiked) {
        await PostEntity.findByIdAndUpdate(postId, {
          $addToSet: { usersSaved: userId },
          $inc: { "actions.bookmarks": 1 },
        })
      }

      await UserEntity.findByIdAndUpdate(userId, { $addToSet: { savedPosts: postId } })
    } catch (error: any) {
      console.error(`Error liking post: ${error.message}`)
      throw new Error("Error liking post")
    }
  }

  /**
   * Get posts for a specific user and return the posts
   * @param id - The ID of the user
   * @param skip - The number of posts to skip (default is 0)
   * @returns The posts of the user
   */
  async getBookmarks(id: Types.ObjectId, skip: number = 0): Promise<Post[]> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid user id")
      }
      const post = await UserEntity.aggregate([
        { $match: { _id: new Types.ObjectId(id) } },
        {
          $project: {
            savedPosts: 1,
          },
        },
        { $lookup: { from: "posts", localField: "savedPosts", foreignField: "_id", as: "posts" } },
        {
          $unwind: "$posts",
        },
        {
          $project: {
            posts: 1,
          },
        },
        {
          $sort: { "posts._id": -1 },
        },
        {
          $skip: skip,
        },
        {
          $limit: 6,
        },
        { $group: { _id: "$_id", posts: { $push: "$posts" } } },
      ])
      return post[0]?.posts || []
    } catch (error: any) {
      console.error(`Error fetching user posts: ${error.message}`)
      throw new Error("Error fetching user posts")
    }
  }
}
