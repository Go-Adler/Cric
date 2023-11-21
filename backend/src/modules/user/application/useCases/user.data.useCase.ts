import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"
import { SocketDataAccess } from "../../data/user.socketDataAccess"
import { SocketData } from "../../../../shared/interfaces/user.socketData.interface"
import { handleError } from "../../../../utils/handleError.utils"


/**
 * UserDataUseCase class handles user data-related use cases.
 */
export class UserDataUseCase {
  // Declaring the private properties
  private userDataAccess: UserDataAccess
  private socketDataAccess: SocketDataAccess

  // Defining constants for error messages
  private static readonly ERROR_MESSAGE = "An error occurred while performing the operation.";
  private static readonly INVALID_INPUT_MESSAGE = "Invalid input provided.";

  /**
   * Constructor initializes UserDataAccess and SocketDataAccess instances.
   */
  constructor() {
    this.userDataAccess = new UserDataAccess()
    this.socketDataAccess = new SocketDataAccess()
  }

  /**
   * Establishes a socket connection for a user.
   * @param userName - User's name.
   * @param socketId - Socket ID.
   * @returns A promise that resolves to the socket data or rejects with an error.
   */
  setSocketConnection = async (userName: string, socketId: string) => {
    try {
      // Validating the inputs
      if (!userName || !socketId) {
        handleError(UserDataUseCase.INVALID_INPUT_MESSAGE)
      }

      // Adding the socket ID to the user data
      await this.userDataAccess.addSocketId(userName, socketId)

      // Adding the socket data to the socket data access
      await this.socketDataAccess.SocketAdd(userName, socketId)

      // Returning the socket data
      return { userName, socketId }
    } catch (e: any) {
      console.error(`Error in set socketConnection: ${e.message}`)
      throw new Error(e.message)
    }
  }


  /**
   * Removes a socket connection based on the socket ID.
   * @param socketId - Socket ID to be removed.
   * @returns A promise that resolves to the socket data or rejects with an error.
   */
  removeSocketConnection = async (socketId: string): Promise<SocketData> => {
    // Validating the input
    if (!socketId) {
      handleError(UserDataUseCase.INVALID_INPUT_MESSAGE)
    }

    // Getting the user name associated with the socket ID
    const userName = await this.socketDataAccess.GetUserNameWithSocketId(socketId)

    // Removing the socket ID from the user data
    await this.userDataAccess.removeSocketId(userName, socketId)

    // Removing the socket ID from the socket data access
    await this.socketDataAccess.removeSocketId(socketId)

    // Returning the socket data
    return { userName, socketId }
  }

  /**
   * Checks if a user is the same as the one associated with a post.
   * @param postId - Post ID.
   * @param userId - User ID.
   * @returns A promise that resolves to a boolean value or rejects with an error.
   */
  checkSameUser = async (postId: Types.ObjectId, userId: string) => {
    // Validating the inputs
    if (!postId || !userId) {
      throw new Error(UserDataUseCase.INVALID_INPUT_MESSAGE)
    }

    // Checking if the user is the same as the one associated with the post
    return await this.userDataAccess.checkDifferentUser(postId, userId)
  }

  /**
   * Retrieves all sockets associated with a user.
   * @param userId - User ID.
   * @returns A promise that resolves to an array of socket IDs or rejects with an error.
   */
  getSockets = async (userId: string) => {
    // Validating the input
    if (!userId) {
      throw new Error(UserDataUseCase.INVALID_INPUT_MESSAGE)
    }

    // Getting the sockets associated with the user
    try {
      return await this.userDataAccess.getSocketsWithId(userId)
    } catch (e: any) {
      // Logging and rethrowing the error
      console.log(e.message)
      throw new Error(UserDataUseCase.ERROR_MESSAGE)
    }
  }
}
