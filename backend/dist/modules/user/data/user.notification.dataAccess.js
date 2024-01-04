"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationDataAccess = void 0;
const user_schema_1 = require("../domain/user.schema");
const handleError_utils_1 = require("../../../utils/handleError.utils");
/**
 * NotificationDataAccess class responsible for handling user notifications
 */
class NotificationDataAccess {
    /**
     * Retrieves the notification count for a specified user
     * @param userId The identifier of the user
     * @returns The number of notifications for the given user, or 0 if no notifications exist
     */
    async getNotificationsCount(userId) {
        try {
            const userData = await user_schema_1.UserEntity.findById(userId).select("notifications");
            if (!userData?.notifications) {
                throw new Error("Unable to retrieve notification count");
            }
            const readNotifications = userData.notifications.filter((notification) => notification.read === false);
            // Get the count of read notifications
            const readNotificationsCount = readNotifications.length;
            return readNotificationsCount;
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getNotificationsCount, dataAccess", error.message);
        }
    }
    /**
     * Adds a new notification to the specified user
     * @param userId The identifier of the user
     * @param type The type of notification (e.g., 'like', 'comment')
     * @param postId The identifier of the associated post
     * @param postUserId The identifier of the post's owner
     * @returns The newly created notification object
     */
    async addNotification(userId, type, postUserId, postId) {
        try {
            const userData = await user_schema_1.UserEntity.findById(userId).select("userName profilePicture");
            if (!userData) {
                throw new Error("User does not exist. Unable to add notification");
            }
            const { userName, profilePicture } = userData;
            await user_schema_1.UserEntity.findByIdAndUpdate(postUserId, {
                $push: {
                    notifications: {
                        type,
                        userName,
                        postId,
                        profilePicture,
                        userId,
                        timeStamp: Date.now(),
                        read: false,
                    },
                },
            });
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in addNotification, dataAccess", error.message);
        }
    }
    /**
     * Retrieves all notifications for the specified user
     * @param userId The identifier of the user
     * @returns An array of notification objects
     */
    async getNotifications(userId) {
        try {
            const userData = await user_schema_1.UserEntity.findById(userId).select("notifications").sort({ "notifications.timeStamp": -1 });
            if (!userData?.notifications) {
                throw new Error("Unable to retrieve notifications");
            }
            return userData.notifications.sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in getNotifications, dataAccess", error.message);
        }
    }
    /**
     * Marks the specified notification as read
     * @param userId The identifier of the user
     * @param notificationId The identifier of the notification to mark
     * @returns The updated notification object
     */
    async markAsRead(userId, notificationId) {
        try {
            const updatedUserDocument = await user_schema_1.UserEntity.findOneAndUpdate({ _id: userId, "notifications._id": notificationId }, { $set: { "notifications.$.read": true } }, { new: true, projection: { notifications: { $elemMatch: { _id: notificationId } } } });
            if (!updatedUserDocument?.notifications[0]) {
                throw new Error("Unable to mark notification as read");
            }
            return updatedUserDocument.notifications[0];
        }
        catch (error) {
            handleError_utils_1.ErrorHandling.processError("Error in markAsRead, dataAccess", error.message);
            throw new Error("Unable to mark notification as read");
        }
    }
}
exports.NotificationDataAccess = NotificationDataAccess;
