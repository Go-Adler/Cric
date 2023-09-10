import { PasswordManager } from '../../../../utils/bcrypt.utils'
import { UserDataAccess } from '../../data/user.dataAccess'

export class UserLoginUseCase {
  private userDataAccess: UserDataAccess
  private passwordManager: PasswordManager

  constructor() {
    this.userDataAccess = new UserDataAccess()
    this.passwordManager = new PasswordManager()
  }

  userLogIn = async (email: string, inputPassword: string) => {
    try {
      // get hashedPassword
      const hashedPassword = await this.userDataAccess.getUserPasswordByEmail(
        email
      )

      // compare passwords
      const comparePasswords = await this.passwordManager.comparePasswords(
        inputPassword,
        hashedPassword ?? ''
      )

      if (comparePasswords === false) {
        throw new Error('InvalidPassword')
      }

      // Get user id
      const userId = await this.userDataAccess.getUserIdWithEmail(email)

      return userId ?? ''
    } catch (error) {
      // Handle the error here, you can log it or perform any necessary actions.
      console.error('Error in userLogIn:', error)
      throw error; // Re-throw the error to let the caller handle it.
    }
  }

  isVerified = async (email: string) => {
    try {
      const isVerified = this.userDataAccess.isVerified(email)
      return isVerified
    } catch (error) {
      // Handle the error here, you can log it or perform any necessary actions.
      console.error('Error in isVerified:', error)
      throw error; // Re-throw the error to let the caller handle it.
    }
  } 
}
