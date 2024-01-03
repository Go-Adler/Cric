"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentPostUseCase = void 0;
const user_comment_dataAccess_1 = __importDefault(require("../../data/user.comment.dataAccess"));
const ERROR_MESSAGES = {
    INVALID_ID: "Invalid ID",
    COMMENT_CREATION: "Error in comment creation",
    FETCH_COMMENTS: "Error fetching comments",
    LIKE_COMMENT: "Error liking comment",
    UNLIKE_COMMENT: "Error unliking comment",
};
/**
 * Class for handling comment post use case
 */
class CommentPostUseCase {
    constructor() {
        this.commentDataAccess = new user_comment_dataAccess_1.default();
    }
    /**
     * Create a new comment for a post and return the created comment
     * @param {Types.ObjectId} postId - The ID of the post to be commented
     * @param {Post} commentData - The comment data
     * @returns {Promise<Post>} The created comment
     * @throws {Error} if an error occurs during comment creation
     */
    async createComment(postId, commentData) {
        try {
            return this.commentDataAccess.createComment(postId, commentData);
        }
        catch (error) {
            console.error(`${ERROR_MESSAGES.COMMENT_CREATION}: ${error}`);
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
    async getComments(postId, skip = 0) {
        try {
            return this.commentDataAccess.getComments(postId, skip);
        }
        catch (error) {
            console.error(`${ERROR_MESSAGES.FETCH_COMMENTS}: ${error}`);
            throw new Error(ERROR_MESSAGES.FETCH_COMMENTS);
        }
    }
    /**
     * Like a comment
     * @param {Types.ObjectId} userId - The ID of the user who likes the comment
     * @param {Types.ObjectId} commentId - The ID of the comment to be liked
     * @throws {Error} if an error occurs while liking the comment
     */
    async likeComment(userId, commentId) {
        try {
            await this.commentDataAccess.likeComment(userId, commentId);
        }
        catch (error) {
            console.error(`${ERROR_MESSAGES.LIKE_COMMENT}: ${error}`);
            throw new Error(ERROR_MESSAGES.LIKE_COMMENT);
        }
    }
    /**
     * Unlike a comment
     * @param {Types.ObjectId} userId - The ID of the user who unlikes the comment
     * @param {Types.ObjectId} commentId - The ID of the comment to be unliked
     * @throws {Error} if an error occurs while unliking the comment
     */
    async unlikeComment(userId, commentId) {
        try {
            await this.commentDataAccess.unlikeComment(userId, commentId);
        }
        catch (error) {
            console.error(`${ERROR_MESSAGES.UNLIKE_COMMENT}: ${error}`);
            throw new Error(ERROR_MESSAGES.UNLIKE_COMMENT);
        }
    }
}
exports.CommentPostUseCase = CommentPostUseCase;
