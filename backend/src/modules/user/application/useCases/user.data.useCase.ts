import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"
import { Socket } from "socket.io"

export class UserDataUseCase {
  private userDataAccess:UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  setSocketConnection = async (userId: Types.ObjectId, socket: Socket) => {
    await this.userDataAccess.addNotificationSocket(userId, socket)
  }
}