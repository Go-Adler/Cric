import { ErrorHandling } from "../../../../utils/handleError.utils"
import { UserDataAccess } from "../../data/user.dataAccess"
import { SocketDataAccess } from "../../data/user.socket.dataAccess"

export class SocketUseCase {
  private userDataAccess: UserDataAccess
  private socketDataAccess: SocketDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
    this.socketDataAccess = new SocketDataAccess()
  }

  /**
   * Method to store socket id in database.
   * @param userName - User's name.
   * @param socketId - Socket ID.
   */
  async setSocketConnection(userName: string, socketId: string) {
    try {
      await this.userDataAccess.addSocketId(userName, socketId)
      await this.socketDataAccess.socketAdd(userName, socketId)
    } catch (error) {
      ErrorHandling.processError("Error while setting socket connection", error)
    }
  }

  /**
 * Method to remove a socket connection based on the socket ID.
 * @param socketId - Socket ID to be removed.
 * @returns A promise that resolves to the socket data or rejects with an error.
 */
  async removeSocketConnection(socketId: string) {
    try {
      const socket = await this.socketDataAccess.removeSocketId(socketId)
      if (socket) {
        const { userName } = socket
        await this.userDataAccess.removeSocketId(userName, socketId)
      } else throw new Error('Socket not found')
    } catch (error) {
      ErrorHandling.processError("Error while removing socket connection", error)
    }
  }

  /**
 * Method to remove all socket connections once server restarts. // Can be removed in production
 * 
 */
  async removeAllSocketConnections(): Promise<void> {
    try {
      
      const sockets = await this.socketDataAccess.getAllSockets()

      for (const socket of sockets) {
        await this.removeSocketConnection(socket.socketId)
      }
    } catch (error) {
      ErrorHandling.processError("Error while removing socket connection", error)
    }
  }
}