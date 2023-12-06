import { Types } from 'mongoose'
import { UserEntity } from '../domain/user.schema'
import { ErrorHandling } from '../../../utils/handleError.utils'

export class UserFriendDataAccess {
  /**
   * Method to add a user as friend
   * 
   * @param userId - ID of the user
   * @param personId - ID of the user to be add as friend
   */
  async addToFriendsList(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await UserEntity.findByIdAndUpdate({ userId }, { $addToSet: { friends: personId } })
    } catch (error) {
      ErrorHandling.processError('Error in addToFriendsList, UserFriendDataAccess', error)
    }
  }

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
}