import { WrongPasswordError } from "../../../../shared/errors/wrongPassword.error"
import { UserDataAccess } from "../../data/user.dataAccess"

export class UserLoginUseCase {
  private userDataAccess: UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  userLogIn = async(email: string, inputPassword: string) =>  {
    const password = await this.userDataAccess.getUserPasswordByEmail(email)
    if (password !== inputPassword) {
      throw new WrongPasswordError('Wrong password')
    }
  return true
  }
}