import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"
import { ErrorHandling } from "../../../../utils/handleError.utils"

/**
 * Class to handle user data-related use cases.
 */
export class UserDataUseCase {
  private userDataAccess: UserDataAccess

  /**
   * Constructor to initialize UserDataAccess and SocketDataAccess instances.
   */
  constructor() {
    this.userDataAccess = new UserDataAccess()
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
