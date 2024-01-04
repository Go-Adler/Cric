"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostLikeController = void 0;
const mongoose_1 = require("mongoose");
const user_likePost_useCase_1 = require("../../application/useCases/user.likePost.useCase");
const user_data_useCase_1 = require("../../application/useCases/user.data.useCase");
const socketService_service_1 = require("../../../../services/socketService.service");
const user_notification_useCase_1 = require("../../application/useCases/user.notification.useCase");
/**
 * Controller class for liking and unliking a post
 */
class PostLikeController {
    constructor() {
        /**
         * Method to handle the request for liking a post
         * @param req - The request object
         * @param res - The response object
         * @param next - The next middleware function in the stack
         */
        this.likePost = async (req, res, next) => {
            const { userId } = req.user;
            const { postId } = req.body;
            // Validate inputs
            if (!userId || !postId) {
                return res.status(400).json({ message: "Invalid inputs" });
            }
            try {
                await this.likePostUseCase.likePost(userId, postId);
                // Returns false or if user is present the user id
                const isDifferentUser = await this.userDataUseCase.checkSameUser(postId, userId);
                if (isDifferentUser instanceof mongoose_1.Types.ObjectId) {
                    // adding notification to user
                    await this.notificationUseCase.addNotification(userId, "like", isDifferentUser, postId);
                    // sending user id getting from checking the user
                    await this.socketService.sendNotification(isDifferentUser);
                }
                // Send a response back to indicate success
                return res.status(200).json({ message: "Successfully liked the post" });
            }
            catch (error) {
                console.error(error);
                return next(error);
            }
        };
        /**
         * Method to handle the request for unliking a post
         * @param req - The request object
         * @param res - The response object
         * @param next - The next middleware function in the stack
         */
        this.unlikePost = async (req, res, next) => {
            const { userId } = req.user;
            const { postId } = req.body;
            // Validate inputs
            if (!userId || !postId) {
                return res.status(400).json({ message: "Invalid inputs" });
            }
            try {
                await this.likePostUseCase.unlikePost(userId, postId);
                // Send a response back to indicate success
                return res.status(200).json({ message: "Successfully unliked the post" });
            }
            catch (error) {
                console.error(error);
                return next(error);
            }
        };
        this.likePostUseCase = new user_likePost_useCase_1.LikePostUseCase();
        this.userDataUseCase = new user_data_useCase_1.UserDataUseCase();
        this.notificationUseCase = new user_notification_useCase_1.NotificationUseCase();
        this.socketService = socketService_service_1.SocketService.getInstance();
    }
}
exports.PostLikeController = PostLikeController;
