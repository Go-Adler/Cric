import { UserDataAccess } from '../../data/user.dataAccess'

export class UserChangePasswordUseCase {
  private userDataAccess: UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  changePassword = async (email: string, password: string) => {
    try {
      await this.userDataAccess.changePassword(email, password)
    } catch (error) {
      throw error
    }
  }
}
