import { UserDataAccess } from '../../data/user.dataAccess'
import { UserExistingError } from '../../../../shared/errors/userExisting.error'
import { ErrorHandling } from '../../../../utils/handleError.utils'

export class UserExistingUseCase {
  private userDataAccess: UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  async userExisting(userName: string, phone: string, email: string) {
    try {
      // Check if the username is already taken
      const existingUserName = await this.userDataAccess.checkUserByUserName(userName)

      if (existingUserName) {
        throw new UserExistingError('User name already taken')
      }

      // Check if the phone is already taken
      const existingPhone = await this.userDataAccess.checkUserByPhone(phone)

      if (existingPhone) {
        throw new UserExistingError('Phone already taken')
      }

      // Check if the email is already taken
      const existingEmail = await this.userDataAccess.checkUserByEmail(email)

      if (existingEmail) {
        throw new UserExistingError('Email already taken')
      }

      return true
    } catch (error) {
      ErrorHandling.processError('Error in userExisting, UserExistingUseCase', error)
    }
  }

  async userExistingLogIn(email: string) {
    // Check if the user existing
    const userId = await this.userDataAccess.checkUserByEmail(email)
    return userId
  }
}
