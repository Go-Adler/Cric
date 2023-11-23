import { Types } from 'mongoose'
import { UserDataAccess } from '../../data/user.dataAccess'

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
   * @throws Error if there's an issue while liking the post.
   */
   async addNotification(userId: Types.ObjectId, type: string, postId: Types.ObjectId, postUserId: string): Promise<void> {
    try {
      await this.userDataAccess.addNotification(userId, type, postId, postUserId);
    } catch (error) {
      console.error(`Error occurred while adding notification: ${error}`);
      throw error;
    }
  }
}
