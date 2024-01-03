"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const post_commentSchema_1 = require("../domain/post.commentSchema");
const user_postSchema_1 = require("../domain/user.postSchema");
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
    validateObjectId(id) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
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
    async createComment(postId, postData) {
        this.validateObjectId(postId);
        try {
            const comment = await post_commentSchema_1.CommentEntity.create(postData);
            await user_postSchema_1.PostEntity.findByIdAndUpdate(postId, { $push: { replies: comment._id } });
            return comment;
        }
        catch (error) {
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
    async getComments(postId, skip = 0) {
        this.validateObjectId(postId);
        try {
            const commentsResult = await user_postSchema_1.PostEntity.aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(postId) } },
                { $unwind: "$replies" },
                { $sort: { "replies.createdAt": -1 } },
                { $skip: skip },
                { $limit: DEFAULT_COMMENT_LIMIT },
                { $group: { _id: null, replies: { $push: "$replies" } } },
                { $project: { _id: 0, replies: 1 } },
            ]);
            const comments = await post_commentSchema_1.CommentEntity.aggregate([
                { $match: { _id: { $in: commentsResult[0]?.replies || [] } } },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'personDetails'
                    }
                },
                {
                    $unwind: {
                        path: '$personDetails',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        'content': 1,
                        'timestamp': 1,
                        'actions': 1,
                        'engagement': 1,
                        'usersLiked': 1,
                        'personDetails.name': 1,
                        'personDetails.userName': 1,
                        'personDetails.profilePicture': 1
                    }
                },
                { $sort: { createdAt: -1 } }
            ]);
            return comments;
        }
        catch (error) {
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
    async likeComment(userId, commentId) {
        this.validateObjectId(userId);
        this.validateObjectId(commentId);
        try {
            await post_commentSchema_1.CommentEntity.findByIdAndUpdate(commentId, {
                $addToSet: { usersLiked: userId },
                $inc: { "actions.likes": 1 },
            });
        }
        catch (error) {
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
    async unlikeComment(userId, commentId) {
        this.validateObjectId(userId);
        this.validateObjectId(commentId);
        try {
            await post_commentSchema_1.CommentEntity.findByIdAndUpdate(commentId, {
                $pull: { usersLiked: userId },
                $inc: { "actions.likes": -1 },
            });
        }
        catch (error) {
            console.error(`${ERROR_MESSAGES.UNLIKE_COMMENT}: ${error.message}`);
            throw new Error(ERROR_MESSAGES.UNLIKE_COMMENT);
        }
    }
}
exports.default = CommentsDataAccess;
