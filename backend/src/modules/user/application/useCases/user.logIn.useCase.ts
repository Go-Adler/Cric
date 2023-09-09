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
    // get hashedPassword
    const hashedPassword = await this.userDataAccess.getUserPasswordByEmail(
      email
    )

    // compare passwords
    const comparePasswords = await this.passwordManager.comparePasswords(
      inputPassword,
      hashedPassword
    )

    if (comparePasswords === false) throw new Error('InvalidPassword')

    // Get user id
    const userId = await this.userDataAccess.getUserIdWithEmail(email)

    return userId
  }


  isVerified = async (email: string) => {
    return await this.userDataAccess.isVerified(email)
  } 
}
