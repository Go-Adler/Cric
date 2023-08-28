import { UserDataAccess } from "../../data/user.dataAccess"
import { I_User } from "../../../../shared/interfaces/user.interface"
import { PasswordManager } from "../../../../utils/bcrypt.utils"

export class CreateUserUseCase {
  private userDataAccess: UserDataAccess
  private passwordManager: PasswordManager
  
  constructor() {
    this.userDataAccess = new UserDataAccess()
    this.passwordManager = new PasswordManager()
  }

  createUser = async (userData: I_User) => {
    const {name, userName, email, gender, phone} = userData
    let { password } = userData

    password = await this.passwordManager.hashPassword(password)
    

    await this.userDataAccess.createUser(name, userName, gender, email, phone, password)
  }
}