import { UserDataAccess } from "../../data/user.dataAccess"
import { I_User } from "../../../../shared/interfaces/user.interface"

export class CreateUserUseCase {
  private userDataAccess: UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  createUser = async (userData: I_User) => {
    console.log(userData);
    
    const {name, userName, email, gender, password, phone} = userData
    await this.userDataAccess.createUser(name, userName, gender, email, phone, password)
  }
}