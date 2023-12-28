import { Types } from 'mongoose'
import { UserFriendDataAccess } from '../../data/user.friend.dataAccess'
import { ErrorHandling } from '../../../../utils/handleError.utils'

export class UserFriendUseCase {
  private friendDataAccess: UserFriendDataAccess

  constructor() {
    this.friendDataAccess = new UserFriendDataAccess()
  }

  /**
   * Method to add friend request
   * 
   * @param userId - The ID of the user
   * @param personId - The ID of the user for friend request to be send.
   */
  async addRequest(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await this.friendDataAccess.addToRequestList(userId, personId)
    } catch(error) {
      ErrorHandling.processError('Erron in addRequest, UserFriendUseCase', error)
    }
  }

  /**
   * Method to accept friend
   * 
   * @param userId - The ID of the user who accept request
   * @param personId - The ID of the user whose request to be accepted
   */
  async acceptRequest(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await this.friendDataAccess.removeFromRequestList(userId, personId)
      await this.friendDataAccess.addToFriendsList(userId, personId)
    } catch(error) {
      ErrorHandling.processError('Erron in acceptRequest, UserFriendUseCase', error)
    }
  }


  /**
   * Method to reject friend
   * 
   * @param userId - The ID of the user who accept request
   * @param personId - The ID of the user whose request to be accepted
   */
  async rejectRequest(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await this.friendDataAccess.removeFromRequestList(userId, personId)
    } catch(error) {
      ErrorHandling.processError('Erron in rejectRequest, UserFriendUseCase', error)
    }
  }

  /**
 * Method to remove friend
 * 
 * @param userId - The ID of the user who accept request
 * @param personId - The ID of the user who need to be removed
 */
  async removeFriend(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await this.friendDataAccess.removeFromFriendList(userId, personId)
    } catch(error) {
      ErrorHandling.processError('Erron in removeFriend, UserFriendUseCase', error)
    }
  }


  /**
 * Method to get friend list
 * 
 * @param userId - The ID of the user who accept request
 */
  async getAll(userId: Types.ObjectId) {
    try {
      return await this.friendDataAccess.getAllFriends(userId)
    } catch(error) {
      ErrorHandling.processError('Erron in removeFriend, UserFriendUseCase', error)
    }
  }
}