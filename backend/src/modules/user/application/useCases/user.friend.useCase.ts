import { Types } from 'mongoose'
import { UserFriendDataAccess } from '../../data/user.friend.dataAccess'
import { ErrorHandling } from '../../../../utils/handleError.utils'

export class UserFriendUseCase {
  private friendDataAccess: UserFriendDataAccess
  constructor() {
    this.friendDataAccess = new UserFriendDataAccess()
  }


  async addFriend(userId: Types.ObjectId, personId: Types.ObjectId): Promise<boolean> {
    try {
      return await this.friendDataAccess.addToFriendsList(userId, personId)
    } catch(error) {
      ErrorHandling.processError('Erron in addFreind, UserFriendUseCase', error)
    }
  }
}