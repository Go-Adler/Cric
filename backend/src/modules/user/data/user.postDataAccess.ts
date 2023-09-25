// Import necessary modules and types
import { UserEntity } from '../domain/user.schema'
import { PostEntity, postSchema } from '../domain/user.postSchema'
import { PostDocument } from '../../../shared/interfaces/userPost.interface'
import mongoose, { Types } from 'mongoose'

export class UserPostDataAccess {
  // Create a new post for a user
  async createPost(userId: Types.ObjectId, postData: PostDocument) {
    try {
      postData.actions = {}
      
      // Create a new post entity using the provided data
      const post = new PostEntity(postData)

      // Find and update the user by their ID, pushing the new post into the 'posts' array
      // Return the new post
      const newPost = await UserEntity.findByIdAndUpdate(
        userId,
        { $push: { posts: post } },
        { new: true, projection: { posts: { $elemMatch: { _id: post._id } } } }
      )

      const createdPost: any  = newPost?.posts[0]
      
      return createdPost
    } catch (error: any) {
      console.error(error.message, 31)
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
    } catch (error) {
      throw new Error('Error fetching user posts')
    }
  }
}
