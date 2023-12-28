import { Types } from 'mongoose'
import { UserEntity } from '../domain/user.schema'
import { ErrorHandling } from '../../../utils/handleError.utils'

export class UserFriendDataAccess {
  /**
   * Method to add a user to friend request list and friend request sent list
   * 
   * @param userId - ID of the user
   * @param personId - ID of the user to be added as friend
   */
  async addToRequestList(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await UserEntity.findByIdAndUpdate(userId, { $addToSet: { friendRequestsSent: personId } })
      await UserEntity.findByIdAndUpdate(personId, { $addToSet: { friendRequestsReceived: userId } })
    } catch (error) {
      ErrorHandling.processError('Error in addToRequestList, UserFriendDataAccess', error)
    }
  }

  /**
 * Method to remove user from friend request list and friend request sent list
 * 
 * @param userId - ID of the user
 * @param personId - ID of the user to be added as friend
 */
  async removeFromRequestList(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await UserEntity.findByIdAndUpdate(personId, { $pull: { friendRequestsSent: userId } })
      await UserEntity.findByIdAndUpdate(userId, { $pull: { friendRequestsReceived: personId } })
    } catch (error) {
      ErrorHandling.processError('Error in removeFromRequestList, UserFriendDataAccess', error)
    }
  }

  /**
   * Method to add IDs to friends list for both user
   * 
   * @param userId - ID of the user
   * @param personId - ID of the user to be added as friend
   */
  async addToFriendsList(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await UserEntity.findByIdAndUpdate(personId, { $addToSet: { friends: userId } })
      await UserEntity.findByIdAndUpdate(userId, { $addToSet: { friends: personId } })
    } catch (error) {
      ErrorHandling.processError('Error in addToFriendsList, UserFriendDataAccess', error)
    }
  }

  /**
   * Method to remove IDs from friends list for both user
   * 
   * @param userId - ID of the user
   * @param personId - ID of the user to rmoved added from friend list
   */
  async removeFromFriendList(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await UserEntity.findByIdAndUpdate(personId, { $pull: { friends: userId } })
      await UserEntity.findByIdAndUpdate(userId, { $pull: { friends: personId } })
    } catch (error) {
      ErrorHandling.processError('Error in removeFromFriendList, UserFriendDataAccess', error)
    }
  }


  /**
   * Method to get all friends
   * 
   * @param userId - ID of the user
   */
  async getAllFriends(userId: Types.ObjectId) {
    try {
      return await UserEntity.aggregate([
        { $match: { _id: new Types.ObjectId(userId) } },
        { $pr}
      ])
      await UserEntity.findByIdAndUpdate(personId, { $pull: { friends: userId } })
      await UserEntity.findByIdAndUpdate(userId, { $pull: { friends: personId } })
    } catch (error) {
      ErrorHandling.processError('Error in removeFromFriendList, UserFriendDataAccess', error)
    }
  }
}