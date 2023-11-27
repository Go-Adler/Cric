import { Types } from 'mongoose';
import { UserEntity } from '../domain/user.schema';
import { ErrorHandling } from '../../../utils/handleError.utils';
import { Notification } from '../../../shared/interfaces/user.notification.interface';

/**
 * NotificationDataAccess class responsible for handling user notifications
 */
export class NotificationDataAccess {
  /**
   * Retrieves the notification count for a specified user
   * @param userId The identifier of the user
   * @returns The number of notifications for the given user, or 0 if no notifications exist
   */
  async getNotificationsCount(userId: Types.ObjectId): Promise<number> {
    try {
      const userData = await UserEntity.findById(userId).select('notifications');

      if (!userData?.notifications) {
        throw new Error('Unable to retrieve notification count');
      }

      return userData.notifications.length || 0;
    } catch (error: any) {
      ErrorHandling.processError('Error in getNotificationsCount, dataAccess', error.message);
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
  async addNotification(
    userId: Types.ObjectId,
    type: string,
    postId: Types.ObjectId,
    postUserId: Types.ObjectId
  ): Promise<Notification> {
    try {
      const userData = await UserEntity.findById(userId).select('userName profilePicture');

      if (!(userData)) {
        throw new Error('User does not exist. Unable to add notification');
      }

      const { userName, profilePicture } = userData;

      const userUpdatedData = await UserEntity.findByIdAndUpdate(postUserId, {
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
      }, { new: true, select: { notifications: { $slice: -1 } } })

      if (!(userUpdatedData && userUpdatedData?.notifications[0])) throw new Error('Error adding notification')
      const newNotification = userUpdatedData?.notifications[0]

      return newNotification
    } catch (error: any) {
      ErrorHandling.processError('Error in addNotification, dataAccess', error.message);
    }
  }

  /**
   * Retrieves all notifications for the specified user
   * @param userId The identifier of the user
   * @returns An array of notification objects
   */
  async getNotifications(userId: Types.ObjectId): Promise<Notification[]> {
    try {
      const userData = await UserEntity.findById(userId).select('notifications').sort({ 'notifications.timeStamp': -1 });

      if (!userData?.notifications) {
        throw new Error('Unable to retrieve notifications');
      }

      return userData.notifications.sort((a, b) => new Date(b.timeStamp).getTime() - new Date(a.timeStamp).getTime());

    } catch (error: any) {
      ErrorHandling.processError('Error in getNotifications, dataAccess', error.message);
    }
  }

  /**
   * Marks the specified notification as read
   * @param userId The identifier of the user
   * @param notificationId The identifier of the notification to mark
   * @returns The updated notification object
   */
  async markAsRead(userId: Types.ObjectId, notificationId: Types.ObjectId): Promise<Notification> {
    try {
      const updatedUserDocument = await UserEntity.findOneAndUpdate(
        { _id: userId, 'notifications._id': notificationId },
        { $set: { 'notifications.$.read': true } },
        { new: true, projection: { notifications: { $elemMatch: { _id: notificationId } } } }
      );

      if (!updatedUserDocument?.notifications[0]) {
        throw new Error('Unable to mark notification as read');
      }

      return updatedUserDocument.notifications[0];
    } catch (error: any) {
      ErrorHandling.processError('Error in markAsRead, dataAccess', error.message);
      throw new Error('Unable to mark notification as read');
    }
  }
}
