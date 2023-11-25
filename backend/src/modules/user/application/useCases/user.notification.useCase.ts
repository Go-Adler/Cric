import { Types } from 'mongoose'
import { UserDataAccess } from '../../data/user.dataAccess'
import { handleError } from '../../../../utils/handleError.utils'
import { Notification } from '../../../../shared/interfaces/user.notification.interface'

export class NotificationUseCase {
  private userDataAccess: UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
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
      return await this.userDataAccess.addNotification(userId, type, postId, postUserId);
    } catch (e: any) {
      console.error(`Error occurred while adding notification: ${e.message}`);
      handleError(e.message)
    }
   }
  
  
  /**
   * Method to get notifications of user.
   * 
   * @param userId - The ID of the user
   * @returns Notifications of the user
   */
  async getNotifications(userId: string) {
    try {
      return await this.userDataAccess.getNotifications(userId)
    } catch (e: any) {
      console.log(`Error occured while fetching notifications ${e.message}`);
      handleError(e.message)
    }
  }
}
