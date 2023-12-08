import { Socket } from "../../../shared/interfaces/socket.interface"
import { ErrorHandling } from "../../../utils/handleError.utils"
import { SocketEntity } from "../domain/user.socketSchema"

export class SocketDataAccess {
  /**
   * Method to add socket ID to the all socket list.
   *
   * @param userName - userName of the user.
   * @param socketId - ID of the socket to be added.
   */
  async socketAdd(userName: string, socketId: string) {
    try {
      await SocketEntity.create({ userName, socketId })
    } catch (error) {
      ErrorHandling.processError("Error in socketAdd, SocketDataAccess", error)
    }
  }

  /**
   * Method to remove socket ID from socket collection
   *
   * @param socketId - Socket ID
   * @returns
   */
  async removeSocketId(socketId: string): Promise<Socket | null> {
    try {
      return await SocketEntity.findOneAndRemove({ socketId })
    } catch (error) {
      ErrorHandling.processError("Error in removeSocketId, SocketDataAccess", error)
    }
  }

  async getAllSockets(): Promise<Socket[]> {
    try {
      return await SocketEntity.find({})
    } catch(error) {
      ErrorHandling.processError('Error in getAllSockets, SocketDataAccess', error)
    }
  }
}
