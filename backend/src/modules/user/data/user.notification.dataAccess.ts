import { Types } from 'mongoose'
import { UserEntity } from '../domain/user.schema'
import { ErrorHandling } from '../../../utils/handleError.utils'
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
      ErrorHandling.processError()
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
      if (!userData?.notifications) throw new Error ('')
      let notifications = userData.notifications
      notifications = notifications.sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime())
      return notifications
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
    }
  }

  /**
   * Method to mark notification as read
   * 
   * @param userId - The ID of the user.
   * @param notificationId - The ID of the notification
   */
  async markAsRead(userId: string, notificationId: string): Promise<Notification> {
    try {
      const updatedUserDocument = await UserEntity.findOneAndUpdate({ _id: userId, 'notifications._id': notificationId}, 
      { $set: { 'notifications.$.read': true } },
      { new: true, projection: { notifications: { $elemMatch: { _id: notificationId } } } })
      if (!updatedUserDocument?.notifications[0]) throw new Error('Error marking notification as read')
      return updatedUserDocument?.notifications[0]
    } catch(error: any) {
      console.error(error.message);
      handleError(error)
    }
  }
}