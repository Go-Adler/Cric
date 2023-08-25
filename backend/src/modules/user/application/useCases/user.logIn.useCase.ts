import { PasswordManager } from "../../../../utils/bcrypt.utils"
import { UserDataAccess } from "../../data/user.dataAccess"

export class UserLoginUseCase {
  private userDataAccess: UserDataAccess
  private passwordManager: PasswordManager

  constructor() {
    this.userDataAccess = new UserDataAccess()
    this.passwordManager = new PasswordManager()
  }

  userLogIn = async(email: string, inputPassword: string) =>  {
    // get hashedPassword
    const hashedPassword  = await this.userDataAccess.getUserPasswordByEmail(email)

    // compare passwords
    const comparePasswords = this.passwordManager.comparePasswords(inputPassword, hashedPassword)

    return comparePasswords
  }
}