import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"
import { SocketDataAccess } from "../../data/user.socketDataAccess"
import { SocketData } from "../../../../shared/interfaces/user.socketData.interface"
import { ErrorHandling } from "../../../../utils/handleError.utils"

/**
 * Class to handle user data-related use cases.
 */
export class UserDataUseCase {
  private userDataAccess: UserDataAccess
  private socketDataAccess: SocketDataAccess

  /**
   * Constructor to initialize UserDataAccess and SocketDataAccess instances.
   */
  constructor() {
    this.userDataAccess = new UserDataAccess()
    this.socketDataAccess = new SocketDataAccess()
  }

  /**
   * Method to establish a socket connection for a user.
   * @param userName - User's name.
   * @param socketId - Socket ID.
   * @returns A promise that resolves to the socket data or rejects with an error.
   */
  async setSocketConnection(userName: string, socketId: string): Promise<SocketData> {
    try {
      await this.userDataAccess.addSocketId(userName, socketId)
      await this.socketDataAccess.SocketAdd(userName, socketId)
      return { userName, socketId }
    } catch (error) {
      ErrorHandling.processError("Error while setting socket connection", error)
    }
  }

  /**
   * Method to remove a socket connection based on the socket ID.
   * @param socketId - Socket ID to be removed.
   * @returns A promise that resolves to the socket data or rejects with an error.
   */
  async removeSocketConnection(socketId: string): Promise<SocketData> {
    try {
      await this.socketDataAccess.removeSocketId(socketId)
      const userName = await this.socketDataAccess.GetUserNameWithSocketId(socketId)
      await this.userDataAccess.removeSocketId(userName, socketId)
      return { userName, socketId }
    } catch (error) {
      ErrorHandling.processError("Error while removing socket connection", error)
    }
  }

  /**
   * Method to check if a user is the same as the one associated with a post.
   * @param postId - Post ID.
   * @param userId - User ID.
   * @returns A promise that resolves to a boolean value or rejects with an error.
   */
  async checkSameUser(postId: Types.ObjectId, userId: string): Promise<boolean | Types.ObjectId> {
    try {
      return await this.userDataAccess.checkDifferentUser(postId, userId)
    } catch (error) {
      ErrorHandling.processError("Error while checking user", error)
    }
  }

  /**
   * Method to retrieve all sockets associated with a user.
   * @param userId - User ID.
   * @returns A promise that resolves to an array of socket IDs or rejects with an error.
   */
  async getSockets(userId: Types.ObjectId): Promise<string[]> {
    try {
      return await this.userDataAccess.getSocketsWithId(userId)
    } catch (error) {
      ErrorHandling.processError("Error while getting sockets", error)
    }
  }
}
