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
   async addNotification(userId: Types.ObjectId, type: string, postId: Types.ObjectId, postUserId: string) {
    try {
      return await this.notificationDataAccess.addNotification(userId, type, postId, postUserId);
    } catch (error: any) {
      ErrorHandling.logError('Error occurred while adding notification, useCase: ', error)
    }
   }
  
  /**
   * Method to get notifications of user.
   * 
   * @param userId - The ID of the user
   * @returns Notifications of the user
   * @throws Error if there's an issue while fetching notifications.
   */
  async getNotifications(userId: string): Promise<Notification[]> {
    try {
      return await this.notificationDataAccess.getNotifications(userId)
    } catch (error: any) {
      ErrorHandling.logError('Error occured while fetching notifications, useCase: ', error)
    }
  }

  /**
   * Method to mark notification as read.
   * 
   * @param userId - The ID of the user.
   * @param notificationId - The ID of the notification.
   * @throws Error if there's an issue while marking notification as read.
   */
  async markAsRead(userId: string, notificationId: string) {
    try {
      return await this.notificationDataAccess.markAsRead(userId, notificationId)
    } catch (error: any) {
      ErrorHandling.logError('Error while marking notification as read, useCase: ', error) 
    }
  }

  /**
   * Method to get the count of notifications.
   * 
   * @param userId - User ID to get the notifications.
   * @returns 
   */
  getNotificationsCount = async (userId: Types.ObjectId) => {
    return await this.notificationDataAccess.getNotificationsCount(userId)
  }
}
