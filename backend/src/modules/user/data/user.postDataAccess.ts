import { UserEntity } from '../domain/user.schema'
import { PostEntity } from '../domain/user.postSchema';
import { PostDocument } from '../../../shared/interfaces/userPost.interface'
import mongoose, { Types } from 'mongoose'

export class UserPostDataAccess {
  // Create a new post for a user
  async createPost(userId: Types.ObjectId, postData: PostDocument) {

    const post = new PostEntity(postData);
    console.log(post, 11);
    
    let newPost = await UserEntity.findByIdAndUpdate(userId, { $push: { posts: post } }, {new: true, projection: { posts: { $slice: -1 } } })
    
    return newPost?.posts[0]
  }

  // Get posts for a specific user
  async getUserPosts(id: Types.ObjectId, skip: number = 0,) {

    
    
    let dPosts = await UserEntity.aggregate([
      // Match the user by id
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      // Unwind the posts array to destructure it
      { $unwind: "$posts" },
      // Sort the posts in reverse order (descending) based on a date field, adjust the field as per your data structure
      { $sort: { "posts.timestamp": -1 } }, // Replace "dateField" with the actual field you want to sort by
      // Skip the first 3 sorted posts
      { $skip: skip },
      // Limit the result to the next 3 sorted posts
      { $limit: 2 },
      // Group the posts back into an array
      {
        $group: {
          _id: null, // Group all posts into a single document
          posts: { $push: "$posts" }, // Push the sorted and limited posts into an array
        },
      },
      // Project to reshape the result as needed
      {
        $project: {
          _id: 0, // Exclude user ID from the result
          posts: 1, // Include the sorted and limited posts array in the result
        },
      },
    ]);
    

    return dPosts[0]?.posts || []
  }
}
