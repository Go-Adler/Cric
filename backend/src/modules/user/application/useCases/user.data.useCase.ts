import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"
import { SocketDataAccess } from "../../data/user.socketDataAccess"

export class UserDataUseCase {
  private userDataAccess: UserDataAccess
  private socketDataAccess: SocketDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
    this.socketDataAccess = new SocketDataAccess()
  }

  setSocketConnection = async (userName: string, socket: string) => {
    await this.userDataAccess.addSocketId(userName, socket)
    await this.socketDataAccess.SocketAdd(userName, socket)
  }

  removeSocketConnection = async (socketId: string) => {
    const userName = await this.socketDataAccess.GetUserNameWithSocketId(socketId)
    await this.userDataAccess.removeSocketId(userName, socketId)
    await this.socketDataAccess.removeSocketId(socketId)
  }
}