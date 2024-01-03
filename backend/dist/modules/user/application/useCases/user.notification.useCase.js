"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationUseCase = void 0;
const user_notification_dataAccess_1 = require("../../data/user.notification.dataAccess");
const handleError_utils_1 = require("../../../../utils/handleError.utils");
/**
 * Notification Use Case
 *
 * Handles all interactions related to user notifications.
 */
class NotificationUseCase {
    constructor() {
        /**
         *
         * @param userId  - The Id of the user.
         * @returns
         */
        this.getNotificationsCount = async (userId) => {
            try {
                return await this.notificationDataAccess.getNotificationsCount(userId);
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in getNotificationCount, useCase: ', error);
            }
        };
        this.notificationDataAccess = new user_notification_dataAccess_1.NotificationDataAccess();
    }
    /**
   * Method to add notification to user.
   *
   * @param userId - The ID of the user who interacts.
   * @param type - The type of interaction.
   * @param postId - The ID of the post interacted with.
   * @returns added notification
   * @throws Error if there's an issue while liking the post.
   */
    async addNotification(userId, type, postUserId, postId) {
        try {
            await this.notificationDataAccess.addNotification(userId, type, postUserId, postId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Error in addNotification, useCase: ', error);
        }
    }
    /**
     * Method to get notifications of user.
     *
     * @param userId - The ID of the user
     * @returns Notifications of the user
     * @throws Error if there's an issue while fetching notifications.
     */
    async getNotifications(userId) {
        try {
            return await this.notificationDataAccess.getNotifications(userId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Error in getNotifications, useCase: ', error);
        }
    }
    /**
     * Method to mark notification as read.
     *
     * @param userId - The ID of the user.
     * @param notificationId - The ID of the notification.
     * @throws Error if there's an issue while marking notification as read.
     */
    async markAsRead(userId, notificationId) {
        try {
            return await this.notificationDataAccess.markAsRead(userId, notificationId);
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError('Error in markAsRead, useCase: ', error);
        }
    }
}
exports.NotificationUseCase = NotificationUseCase;
