import { UserEntity } from "../domain/user.schema";
import { PostEntity } from "../domain/user.postSchema";
import { Post } from "../../../shared/interfaces/userPost.interface";
import mongoose, { Types } from "mongoose";

// UserPostDataAccess class for handling user post related operations
export class UserPostDataAccess {
  // Create a new post for a user and return the created post
  async createPost(userId: Types.ObjectId, postData: Post): Promise<Post> {
    try {
      // Ensure userId is a valid ObjectId
      if (!Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId");
      }

      const post = await PostEntity.create(postData);
      return post;
    } catch (error: any) {
      console.error(`Error in post creation: ${error.message}`);
      throw new Error("Error in post creation");
    }
  }

  // Get posts for a specific user and return the posts
  async getUserPosts(id: Types.ObjectId, skip: number = 0): Promise<Array<Post>> {
    try {
      // Ensure id is a valid ObjectId
      if (!Types.ObjectId.isValid(id)) {
        throw new Error("Invalid user id");
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
      ]);

      const { postIds } = postsResult[0] || { postIds: [] };

      // Find and return the user's posts
      const posts = await PostEntity.find({ _id: { $in: postIds } }).sort({ _id: -1 });
      return posts;
    } catch (error: any) {
      console.error(`Error fetching user posts: ${error.message}`);
      throw new Error("Error fetching user posts");
    }
  }

  // Like a post and return a boolean indicating success
  async likePost(userId: Types.ObjectId, postId: Types.ObjectId) {
    try {
      // Ensure both userId and postId are valid ObjectId values
      if (!Types.ObjectId.isValid(userId) || !Types.ObjectId.isValid(postId)) {
        throw new Error("Invalid userId or postId");
      }

      // Add the user's ID to the 'usersLiked' array of the post
      await PostEntity.findByIdAndUpdate(postId, { $push: { usersLiked: userId } });
    } catch (error: any) {
      console.error(`Error liking post: ${error.message}`);
      throw new Error("Error liking post");
    }
  }
}
