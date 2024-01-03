"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const user_commentPost_useCase_1 = require("../../application/useCases/user.commentPost.useCase");
const user_imageValidation_useCase_1 = require("../../application/useCases/user.imageValidation.useCase");
const user_awsUpload_useCase_1 = require("../../application/useCases/user.awsUpload.useCase");
const user_getAwsUrl_useCase_1 = require("../../application/useCases/user.getAwsUrl.useCase");
const user_postActionsCheck_useCase_1 = require("../../application/useCases/user.postActionsCheck.useCase");
/**
 * Controller class for handling user comments.
 */
class CommentController {
    constructor() {
        /**
         * Handle the request for posting a comment.
         * @param {Request} req - Express request object
         * @param {Response} res - Express response object
         * @param {NextFunction} next - Express next function
         * @returns {Promise<void>}
         */
        this.comment = async (req, res, next) => {
            try {
                const { userId } = req.user;
                const { postId, text } = req.body;
                const imageFile = req.file;
                let multimedia = "";
                if (imageFile) {
                    const isImageValid = await this.imageValidationUseCase.validateImage(imageFile);
                    if (!isImageValid.valid) {
                        res.json({ uploadFailed: true, message: isImageValid.reason });
                        return;
                    }
                    const uploadInfo = await this.awsUploadUseCase.uploadPost(userId, imageFile);
                    if (!uploadInfo) {
                        res.json({ uploadFailed: true });
                        return;
                    }
                    multimedia = uploadInfo;
                }
                const postData = { userId, content: { text, multimedia: [multimedia] } };
                const postWithoutUrl = await this.commentPostUseCase.createComment(postId, postData);
                const post = await this.getAwsUrlUseCase.getUrl(postWithoutUrl);
                res.json({ post });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Handle the request for getting comments.
         * @param {Request} req - Express request object
         * @param {Response} res - Express response object
         * @param {NextFunction} next - Express next function
         * @returns {Promise<void>}
         */
        this.getComments = async (req, res, next) => {
            try {
                const { userId } = req.user;
                const { skip, postId } = req.body;
                const postsWithoutUrl = await this.commentPostUseCase.getComments(postId, skip);
                const posts = await this.getAwsUrlUseCase.getPostsWithUrl(postsWithoutUrl);
                const comments = this.postActionsUseCase.likedPosts(userId, posts);
                res.json({ comments });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Handle the request for liking a comment.
         * @param {Request} req - Express request object
         * @param {Response} res - Express response object
         * @param {NextFunction} next - Express next function
         * @returns {Promise<void>}
         */
        this.likeComment = async (req, res, next) => {
            try {
                const { userId } = req.user;
                const { postId } = req.body;
                await this.commentPostUseCase.likeComment(userId, postId);
                res.json({ message: "Successfully liked the comment" });
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Handle the request for unliking a comment.
         * @param {Request} req - Express request object
         * @param {Response} res - Express response object
         * @param {NextFunction} next - Express next function
         * @returns {Promise<void>}
         */
        this.unlikeComment = async (req, res, next) => {
            try {
                const { userId } = req.user;
                const { postId } = req.body;
                await this.commentPostUseCase.unlikeComment(userId, postId);
                res.json({ message: "Successfully unliked the comment" });
            }
            catch (error) {
                next(error);
            }
        };
        // Initialize use cases
        this.awsUploadUseCase = new user_awsUpload_useCase_1.AwsUploadUseCase();
        this.getAwsUrlUseCase = new user_getAwsUrl_useCase_1.GetAwsUrlUseCase();
        this.commentPostUseCase = new user_commentPost_useCase_1.CommentPostUseCase();
        this.postActionsUseCase = new user_postActionsCheck_useCase_1.PostActionsUseCase();
        this.imageValidationUseCase = new user_imageValidation_useCase_1.ImageValidationUseCase();
    }
}
exports.CommentController = CommentController;
