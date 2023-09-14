import { Types } from 'mongoose'
import { UserDataAccess } from '../../data/user.dataAccess'

export class UserChangePasswordUseCase {
  private userDataAccess: UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  changePassword = async (userId: Types.ObjectId, password: string) => {
    try {
      await this.userDataAccess.changePassword(userId, password)
    } catch (error) {
      throw error
    }
  }
}
