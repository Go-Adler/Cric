import { Types } from 'mongoose'
import { UserEntity } from '../domain/user.schema'
import { ErrorHandling } from '../../../utils/handleError.utils'

export class UserFriendDataAccess {
  /**
   * 
   * @param _id - ID of the user
   * @param personId - ID of the user to be add as friend
   * @returns true if successfully added as friend
   */
  async addToFriendsList(_id: Types.ObjectId, personId: Types.ObjectId): Promise<boolean> {
    try {
      await UserEntity.findOneAndUpdate({_id }, { $push: { friends: personId } })
      return true
    } catch (error) {
      ErrorHandling.processError('Error in addToFriendsList, UserFriendDataAccess', error)
    }
  }
}