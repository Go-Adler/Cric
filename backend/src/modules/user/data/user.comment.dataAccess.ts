import mongoose, { Types } from "mongoose";
import { CommentEntity } from "../domain/post.commentSchema";
import { PostEntity } from "../domain/user.postSchema";
import { Post } from "../../../shared/interfaces/userPost.interface";

const ERROR_MESSAGES = {
  INVALID_ID: "Invalid ID",
  COMMENT_CREATION: "Error in comment creation",
  FETCH_COMMENTS: "Error fetching comments",
  LIKE_COMMENT: "Error liking comment",
  UNLIKE_COMMENT: "Error unliking comment",
};

const DEFAULT_COMMENT_LIMIT = 6;

/**
 * Class for handling comment data access
 */
class CommentsDataAccess {
  /**
   * Validates ObjectId
   * @param {Types.ObjectId} id - The ID to be validated
   * @throws {Error} if the ID is invalid
   */
  private validateObjectId(id: Types.ObjectId) {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error(ERROR_MESSAGES.INVALID_ID);
    }
  }

  /**
   * Create a new comment for a post and return the created comment
   * @param {Types.ObjectId} postId - The ID of the post to be commented
   * @param {Post} postData - The comment data
   * @returns {Promise<Post>} The created comment
   * @throws {Error} if an error occurs during comment creation
   */
  async createComment(postId: Types.ObjectId, postData: Post): Promise<Post> {
    this.validateObjectId(postId);

    try {
      const comment = await CommentEntity.create(postData);
      await PostEntity.findByIdAndUpdate(postId, { $push: { replies: comment._id } });
      return comment;
    } catch (error:any) {
      console.error(`${ERROR_MESSAGES.COMMENT_CREATION}: ${error.message}`);
      throw new Error(ERROR_MESSAGES.COMMENT_CREATION);
    }
  }

  /**
   * Get comments for a specific post and return the comments
   * @param {Types.ObjectId} postId - The ID of the post
   * @param {number} skip - The number of comments to skip (default is 0)
   * @returns {Promise<Post[]>} The comments of the post
   * @throws {Error} if an error occurs while fetching comments
   */
  async getComments(postId: Types.ObjectId, skip = 0): Promise<Post[]> {
    this.validateObjectId(postId);

    try {
      const commentsResult = await PostEntity.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(postId) } },
        { $unwind: "$replies" },
        { $sort: { "replies.createdAt": -1 } },
        { $skip: skip },
        { $limit: DEFAULT_COMMENT_LIMIT },
        { $group: { _id: null, replies: { $push: "$replies" } } },
        { $project: { _id: 0, replies: 1 } },
      ]);

      const comments = await CommentEntity.find({ _id: { $in: commentsResult[0]?.replies || [] } }).sort({ createdAt: -1 });
      return comments;
    } catch (error:any) {
      console.error(`${ERROR_MESSAGES.FETCH_COMMENTS}: ${error.message}`);
      throw new Error(ERROR_MESSAGES.FETCH_COMMENTS);
    }
  }

  /**
   * Like a comment
   * @param {Types.ObjectId} userId - The ID of the user who likes the comment
   * @param {Types.ObjectId} commentId - The ID of the comment to be liked
   * @throws {Error} if an error occurs while liking the comment
   */
  async likeComment(userId: Types.ObjectId, commentId: Types.ObjectId): Promise<void> {
    this.validateObjectId(userId);
    this.validateObjectId(commentId);

    try {
      await CommentEntity.findByIdAndUpdate(commentId, {
        $push: { usersLiked: userId },
        $inc: { "actions.likes": 1 },
      });
    } catch (error:any) {
      console.error(`${ERROR_MESSAGES.LIKE_COMMENT}: ${error.message}`);
      throw new Error(ERROR_MESSAGES.LIKE_COMMENT);
    }
  }

  /**
   * Unlike a comment
   * @param {Types.ObjectId} userId - The ID of the user who unlikes the comment
   * @param {Types.ObjectId} commentId - The ID of the comment to be unliked
   * @throws {Error} if an error occurs while unliking the comment
   */
  async unlikeComment(userId: Types.ObjectId, commentId: Types.ObjectId): Promise<void> {
    this.validateObjectId(userId);
    this.validateObjectId(commentId);

    try {
      await CommentEntity.findByIdAndUpdate(commentId, {
        $pull: { usersLiked: userId },
        $inc: { "actions.likes": -1 },
      });
    } catch (error:any) {
      console.error(`${ERROR_MESSAGES.UNLIKE_COMMENT}: ${error.message}`);
      throw new Error(ERROR_MESSAGES.UNLIKE_COMMENT);
    }
  }
}

export default CommentsDataAccess;