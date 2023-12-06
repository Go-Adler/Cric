import { Types } from 'mongoose'
import { UserFriendDataAccess } from '../../data/user.friend.dataAccess'
import { ErrorHandling } from '../../../../utils/handleError.utils'

export class UserFriendUseCase {
  private friendDataAccess: UserFriendDataAccess
  constructor() {
    this.friendDataAccess = new UserFriendDataAccess()
  }


  async addRequest(userId: Types.ObjectId, personId: Types.ObjectId): Promise<void> {
    try {
      await this.friendDataAccess.addToRequestList(userId, personId)
    } catch(error) {
      ErrorHandling.processError('Erron in addFreind, UserFriendUseCase', error)
    }
  }
}