"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendController = void 0;
const socketService_1 = require("../../../../services/socketService");
const user_friend_useCase_1 = require("../../application/useCases/user.friend.useCase");
const user_notification_useCase_1 = require("../../application/useCases/user.notification.useCase");
const user_getAwsUrl_useCase_1 = require("../../application/useCases/user.getAwsUrl.useCase");
class FriendController {
    constructor() {
        /**
         * Method to add friend request
         *
         * @param req Express request object containing username and JWT payload with user ID.
         * @param res Express response object to send success message.
         * @param next Express next function for error handling.
         */
        this.addFriend = async (req, res, next) => {
            try {
                const { userId } = req.user; // Extract user ID from JWT payload
                const { personId } = req.body;
                await this.friendUseCase.addRequest(userId, personId);
                await this.notificationUseCase.addNotification(userId, 'requestReceived', personId);
                await this.socketService.sendNotification(personId);
                res.json({ message: 'Request successful', friendStatus: 'requestSent' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
       * Method to accept user as friend
       *
       * @param req Express request object containing username and JWT payload with user ID.
       * @param res Express response object to send success message.
       * @param next Express next function for error handling.
       */
        this.acceptFriend = async (req, res, next) => {
            try {
                const { userId } = req.user; // Extract user ID from JWT payload
                const { personId } = req.body;
                await this.friendUseCase.acceptRequest(userId, personId);
                await this.notificationUseCase.addNotification(userId, 'requestAccepted', personId);
                await this.socketService.sendNotification(personId);
                res.json({ message: 'Request successful', friendStatus: 'friend' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
       * Method to reject user as friend
       *
       * @param req Express request object containing username and JWT payload with user ID.
       * @param res Express response object to send success message.
       * @param next Express next function for error handling.
       */
        this.rejectFriend = async (req, res, next) => {
            try {
                const { userId } = req.user; // Extract user ID from JWT payload
                const { personId } = req.body;
                await this.friendUseCase.rejectRequest(userId, personId);
                res.json({ message: 'Request successful', friendStatus: 'stranger' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
       * Method to reject user as friend
       *
       * @param req Express request object containing username and JWT payload with user ID.
       * @param res Express response object to send success message.
       * @param next Express next function for error handling.
       */
        this.removeFriend = async (req, res, next) => {
            try {
                const { userId } = req.user; // Extract user ID from JWT payload
                const { personId } = req.body;
                await this.friendUseCase.removeFriend(userId, personId);
                res.json({ message: 'Request successful', friendStatus: 'stranger' });
            }
            catch (error) {
                next(error);
            }
        };
        /**
       * Method to get all friends
       *
       * @param req Express request object containing username and JWT payload with user ID.
       * @param res Express response object to send success message.
       * @param next Express next function for error handling.
       */
        this.getFriends = async (req, res, next) => {
            try {
                const { userId } = req.user; // Extract user ID from JWT payload
                let friends = await this.friendUseCase.getAll(userId);
                friends = await this.getAwsUrlUseCase.getFriendWithUrl(friends);
                res.json({ friends });
            }
            catch (error) {
                next(error);
            }
        };
        this.friendUseCase = new user_friend_useCase_1.UserFriendUseCase();
        this.getAwsUrlUseCase = new user_getAwsUrl_useCase_1.GetAwsUrlUseCase();
        this.socketService = socketService_1.SocketService.getInstance();
        this.notificationUseCase = new user_notification_useCase_1.NotificationUseCase();
    }
}
exports.FriendController = FriendController;
