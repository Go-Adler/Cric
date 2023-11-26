import { Types } from 'mongoose'
import { UserEntity } from '../domain/user.schema'
import { handleError } from '../../../utils/handleError.utils'
import { Notification } from '../../../shared/interfaces/user.notification.interface'

export class NotificationDataAccess {
  /**
  * Get notification count of a user by user ID
  * @param userId - The ID of the user
  * @returns notification count or 0 if not found
  */
  async getNotificationsCount(userId: Types.ObjectId) {
    try {
      const { notifications } = await UserEntity.findById(userId).select("notifications") as { notifications: [] }
      return notifications.length || 0
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
    }
  }

  /**
  * Get notification count of a user by user ID
  * @param userId - The ID of the user
  * @returns notification count or 0 if not found
  */
  async addNotification(userId: Types.ObjectId, type: string, postId: Types.ObjectId, postUserId: string) {
    try {
      const userData = await UserEntity.findById(userId).select('userName profilePicture')

      if (!userData) throw new Error('Error in adding notificaiton: User does not exist')

      const { userName, profilePicture } = userData
      await UserEntity.findByIdAndUpdate(postUserId, {
        $push: {
          notifications: {
            type,
            userName,
            postId,
            profilePicture,
            userId,
          }
        }
      })
      return { type, userName, postId, timeStamp: Date.now() }
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
    }
  }

  /**
   * Method to get notification of user by user ID.
   * 
   * @param userId - The ID of the user.
   * @returns notifications of user of empty array
  `*/
  async getNotifications(userId: string): Promise<Notification[]> {
    try {
      const userData = await UserEntity.findById(userId).select('notifications').sort({ 'notifications.timeStamp': -1 })
      if (!userData?.notifications) return []
      let notifications = userData.notifications
      notifications = notifications.sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime())
      return notifications
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
      return []
    }
  }

  /**
   * Method to mark notification as read
   * 
   * @param 
   */
  async markAsRead(userId: string, notificationId: string) {
    try {
      const updatedNotification = await UserEntity.updateOne({ _id: userId, 'notifications._id': notificationId}, 
      { $set: { 'notifications.$.read': true } }, { new: true })
      console.log(updatedNotification);
    } catch(error: any) {
      console.error(error.message);
      handleError(error)
    }
  }
}