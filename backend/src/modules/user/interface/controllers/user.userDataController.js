"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataController = void 0;
const mongoose_1 = require("mongoose");
const user_getData_useCase_1 = require("../../application/useCases/user.getData.useCase");
const user_getAwsUrl_useCase_1 = require("../../application/useCases/user.getAwsUrl.useCase");
const user_notification_useCase_1 = require("../../application/useCases/user.notification.useCase");
const user_message_useCase_1 = require("../../application/useCases/user.message.useCase");
class UserDataController {
    constructor() {
        /**
         * Retrieves basic user information for the currently logged-in user.
         *
         * @param req Express request object containing the JWT payload with user ID.
         * @param res Express response object to send user data.
         * @param next Express next function for error handling.
         */
        this.userBasicInfo = async (req, res, next) => {
            try {
                let { userId } = req.user; // Extract user ID from JWT payload
                userId = new mongoose_1.Types.ObjectId(userId);
                let profilePicture = '';
                // Fetch user data using use cases
                const { friendsCount, name, userName, profilePicture: profilePictureWithOutUrl } = await this.userDataUseCase.getBasicInfo(userId);
                const notificationsCount = await this.notificationUseCase.getNotificationsCount(userId);
                const messageCount = await this.messageUseCase.getMessageCount(userId);
                // Generate pre-signed URL for profile picture if available
                if (profilePictureWithOutUrl) {
                    profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePictureWithOutUrl);
                }
                // Build and send user data response
                const userData = {
                    name,
                    userName,
                    messageCount,
                    friendsCount,
                    profilePicture,
                    notificationsCount,
                };
                res.json(userData);
            }
            catch (error) {
                next(error);
            }
        };
        /**
         * Retrieves basic information about a friend by username.
         *
         * @param req Express request object containing username and JWT payload with user ID.
         * @param res Express response object to send friend data.
         * @param next Express next function for error handling.
         */
        this.friendBasicInfo = async (req, res, next) => {
            try {
                const { userName } = req.params; // Get username from request parameters
                const { userId } = req.user; // Extract user ID from JWT payload
                // Get friend's user ID from username
                const personId = await this.userDataUseCase.getUserId(userName);
                // Fetch friend data using use cases
                const name = await this.userDataUseCase.getName(personId);
                const isOnline = await this.userDataUseCase.isOnline(personId);
                const friendsCount = await this.userDataUseCase.getFriendsCount(personId);
                const friendStatus = await this.userDataUseCase.isFriend(personId, userId);
                let profilePicture = await this.userDataUseCase.getProfilePicture(personId);
                // Generate pre-signed URL for profile picture if available
                if (profilePicture) {
                    profilePicture = await this.getAwsUrlUseCase.getImageUrl(profilePicture);
                }
                // Build and send friend data response
                const friendData = {
                    name,
                    personId,
                    isOnline,
                    friendStatus,
                    friendsCount,
                    profilePicture,
                };
                res.json(friendData);
            }
            catch (error) {
                next(error);
            }
        };
        this.messageUseCase = new user_message_useCase_1.MessageUseCase();
        this.getAwsUrlUseCase = new user_getAwsUrl_useCase_1.GetAwsUrlUseCase();
        this.userDataUseCase = new user_getData_useCase_1.GetUserDataUseCase();
        this.notificationUseCase = new user_notification_useCase_1.NotificationUseCase();
    }
}
exports.UserDataController = UserDataController;
