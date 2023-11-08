import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"

export class UserDataUseCase {
  private userDataAccess:UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  setSocketConnection = async (userId: Types.ObjectId, socket: string) => {
    await this.userDataAccess.addNotificationSocket(userId, socket)
  }
}