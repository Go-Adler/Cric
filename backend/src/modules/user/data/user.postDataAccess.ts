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
      await UserEntity.findByIdAndUpdate(userId, { $push: { posts: post._id } })
      console.log(post, 13);
      
      return post
    } catch (error: any) {
      console.error(error.message)
      throw new Error('Error in post creation')
    }
  }

  // Get posts for a specific user
  async getUserPosts(id: Types.ObjectId, skip: number = 0) {
    try {
      // Aggregate user posts using MongoDB aggregation pipeline
      const dPosts = await UserEntity.aggregate([
        // Match the user by ID
        { $match: { _id: new mongoose.Types.ObjectId(id) } },

        // Unwind the 'posts' array to destructure it
        { $unwind: '$posts' },

        // Sort the posts in reverse order (descending) based on a date field
        { $sort: { 'posts.timestamp': -1 } }, // Replace "timestamp" with the actual field you want to sort by

        // Skip the specified number of sorted posts
        { $skip: skip },

        // Limit the result to a specified number of sorted posts
        { $limit: 6 },

        // Group the posts back into an array
        {
          $group: {
            _id: null, // Group all posts into a single document
            posts: { $push: '$posts' }, // Push the sorted and limited posts into an array
          },
        },

        // Project to reshape the result as needed
        {
          $project: {
            _id: 0, // Exclude user ID from the result
            posts: 1, // Include the sorted and limited posts array in the result
          },
        },
      ])

      return dPosts[0]?.posts || []
    } catch (error: any) {
      console.error(error.message);
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
