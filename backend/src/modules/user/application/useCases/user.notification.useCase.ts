import { Types } from 'mongoose'
import { NotificationDataAccess } from '../../data/user.notification.dataAccess'
import { Notification } from '../../../../shared/interfaces/user.notification.interface'
import { ErrorHandling } from '../../../../utils/handleError.utils'

/**
 * Notification Use Case
 *
 * Handles all interactions related to user notifications.
 */
export class NotificationUseCase {
  private notificationDataAccess: NotificationDataAccess

  constructor() {
    this.notificationDataAccess = new NotificationDataAccess()
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
   async addNotification(userId: Types.ObjectId, type: string, postId: Types.ObjectId, postUserId: Types.ObjectId) {
    try {
      return await this.notificationDataAccess.addNotification(userId, type, postId, postUserId);
    } catch (error: any) {
      ErrorHandling.processError('Error in addNotification, useCase: ', error)
    }
   }
  
  /**
   * Method to get notifications of user.
   * 
   * @param userId - The ID of the user
   * @returns Notifications of the user
   * @throws Error if there's an issue while fetching notifications.
   */
  async getNotifications(userId: Types.ObjectId): Promise<Notification[]> {
    try {
      return await this.notificationDataAccess.getNotifications(userId)
    } catch (error: any) {
      ErrorHandling.processError('Error in getNotifications, useCase: ', error)
    }
  }

  /**
   * Method to mark notification as read.
   * 
   * @param userId - The ID of the user.
   * @param notificationId - The ID of the notification.
   * @throws Error if there's an issue while marking notification as read.
   */
  async markAsRead(userId: Types.ObjectId, notificationId: Types.ObjectId): Promise<Notification> {
    try {
      return await this.notificationDataAccess.markAsRead(userId, notificationId)
    } catch (error: any) {
      ErrorHandling.processError('Error in markAsRead, useCase: ', error) 
    }
  }

  /**
   * 
   * @param userId  - The Id of the user.
   * @returns 
   */
  getNotificationsCount = async (userId: Types.ObjectId): Promise<number> => {
    try {
      return await this.notificationDataAccess.getNotificationsCount(userId)
    } catch(error: any) {
      ErrorHandling.processError('Error in getNotificationCount, useCase: ', error) 
    }
  }
}
