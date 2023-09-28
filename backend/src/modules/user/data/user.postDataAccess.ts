// Import necessary modules and types
import { UserEntity } from '../domain/user.schema'
import { PostEntity, postSchema } from '../domain/user.postSchema'
import { Post } from '../../../shared/interfaces/userPost.interface'
import mongoose, { Types } from 'mongoose'

export class UserPostDataAccess {
  // Create a new post for a user
  async createPost(userId: Types.ObjectId, postData: Post) {
    try {
      const post = await PostEntity.create(postData)
      await UserEntity.findByIdAndUpdate(userId, { $push: { postIds: post._id } })

      return post
    } catch (error: any) {
      console.error(error.message)
      throw new Error('Error in post creation')
    }
  }

  // Get posts for a specific user
  async getUserPosts(id: Types.ObjectId, skip: number = 0) {
    try {

      const postsResult = await UserEntity.aggregate([
        // find the user by id
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        // flatten the postIds array
        { $unwind: "$postIds" },
        // sort by post creation date in descending order
        { $sort: { "postIds": 1 } },
        // Skip the first 3 sorted posts
        { $skip: skip },
        // limit to 2 posts
        { $limit: 2 }, 
        // group back by user id and push the posts to an array
        { $group: { _id: null, postIds: { $push: "$postIds" } } },
        {
          $project: {
            _id: 0, 
            postIds: 1, 
          },
        },
      ])

      
      const { postIds } = postsResult[0]
      console.log(postIds, 48);
      
      const posts = await PostEntity.find({ _id: { $in: postIds } }) as Post[]


      return posts
    } catch (error: any) {
      console.error(error.message)
      throw new Error('Error fetching user posts')
    }
  }

  // // Create a new post for a user
  // async likePost(userId: Types.ObjectId, postId: Types.ObjectId) {
  //   try {
  //     // Find and update the user by their ID, pushing the new post into the 'posts' array
  //     // Return the new post
  //     const updatedPost = await UserEntity.findByIdAndUpdate(
  //       userId,
  //       { $push: {posts.usersLiked: userId}}
  //       // { $set: { [`posts.${postId}.liked`]: true } }, // Correct the syntax here
  //       // { new: true, arrayFilters: [{ "post._id": postId }] }
  //     );

  //     console.log(updatedPost);
  //   } catch (error: any) {
  //     console.error(error.message, 31);
  //     throw new Error('Error in post like');
  //   }
  // }

}
