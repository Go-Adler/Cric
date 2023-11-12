import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"

export class UserDataUseCase {
  private userDataAccess:UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  setSocketConnection = async (userName: string, socket: string) => {
    await this.userDataAccess.addSocketId(userName, socket)
  }
}