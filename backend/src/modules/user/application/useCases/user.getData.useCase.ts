import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"
import { ErrorHandling } from "../../../../utils/handleError.utils"
import { FriendStatus } from "../../../../shared/interfaces/personDataResponse.interface"
import { UserBasicInfo } from "../../../../shared/interfaces/userDataResponse.interface"

/**
 * Class responsible for handling user data retrieval use cases.
 */
export class GetUserDataUseCase {
  private userDataAccess: UserDataAccess

  /**
   * Initializes the use case with a UserDataAccess instance.
   */
  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  /**
   * Retrieves the profile picture of a user by their ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to the user's profile picture or null if an error occurs.
   */
  async getProfilePicture(userId: Types.ObjectId): Promise<string> {
    try {
      const isUserExisting = await this.userDataAccess.checkUserExisting(userId)

      if (!!isUserExisting) {
        const userData = await this.userDataAccess.getUserProfilePictureWithId(userId)
        const { profilePicture } = userData
        return profilePicture || ''
      }

      throw new Error("User not found")
    } catch (error) {
      ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error)
    }
  }

  /**
   * Retrieves the user ID based on the username.
   * @param userName - The username of the user.
   * @returns A promise that resolves to the user's ID or null if not found.
   */
  async getUserId(userName: string): Promise<any> {
    try {
      const user = await this.userDataAccess.getUserIdWithUserName(userName)
      return user?._id
    } catch (error) {
      ErrorHandling.processError("Error in getUserId, userGetDataUseCase", error)
    }
  }

  /**
  * Method to check a person is online
  * 
  * @param userName - The username of the user.
  * @returns A promise that resolves to the user's ID or null if not found.
  */
  async isOnline(userId: Types.ObjectId): Promise<any> {
    try {
      const user = await this.userDataAccess.socketExists(userId)
      return !!user?.socketId.length
    } catch (error) {
      ErrorHandling.processError("Error in getUserId, userGetDataUseCase", error)
    }
  }

  /**
   * Retrieves the name of a user by their ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to the user's name or null if an error occurs.
   */
  async getName(userId: Types.ObjectId): Promise<any> {
    try {
      return await this.userDataAccess.getNameById(userId)
    } catch (error) {
      ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error)
    }
  }

  /**
   * Retrieves the username of a user by their ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to the user's username or null if an error occurs.
   */
  async getUserName(userId: Types.ObjectId): Promise<any> {
    try {
      return await this.userDataAccess.getUserNameById(userId)
    } catch (error) {
      ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error)
    }
  }

  /**
   * Retrieves the count of friends for a user by their ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to the count of friends or 0 if an error occurs.
   */
  async getFriendsCount(userId: Types.ObjectId): Promise<number> {
    try {
      return await this.userDataAccess.getFriendsCountById(userId)
    } catch (error) {
      ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error)
      return 0
    }
  }

  /**
   * Retrieves the email of a user by their ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to the user's email or an empty string if an error occurs.
   */
  async getEmail(userId: Types.ObjectId): Promise<string> {
    try {
      return await this.userDataAccess.getEmailById(userId)
    } catch (error) {
      ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error)
      return ""
    }
  }


  /**
   * Retrieves the email of a user by their ID.
   * @param userId - The unique identifier of the user.
   * @returns A promise that resolves to the user's email or an empty string if an error occurs.
   */
  async getPhone(userId: Types.ObjectId): Promise<string> {
    try {
      return await this.userDataAccess.getPhoneById(userId)
    } catch (error) {
      ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error)
      return ""
    }
  }

  /**
   * Retrieves all users in the system.
   * @returns A promise that resolves to an array of users or an empty array if an error occurs.
   */
  async getAllUsers(): Promise<any[]> {
    try {
      return await this.userDataAccess.getUsers()
    } catch (error) {
      ErrorHandling.processError("Error in getProfilePicture, userGetDataUseCase", error)
    }
  }

  /**
   * Blocks a user based on the user ID.
   * @param userId - The ID of the user to be blocked.
   * @returns {Promise<any>} - A promise that resolves after blocking the user.
   */
  async blockUser(userId: Types.ObjectId): Promise<any> {
    try {
      const blockedUser = await this.userDataAccess.blockUser(userId)
      return blockedUser
    } catch (error) {
      ErrorHandling.processError("Error in blockUser, userGetDataUseCase", error)
    }
  }

  /**
   * Unblocks a user based on the user ID.
   * @param userId - The ID of the user to be unblocked.
   * @returns {Promise<any>} - A promise that resolves after unblocking the user.
   */
  async unblockUser(userId: Types.ObjectId): Promise<any> {
    try {
      const unblockedUser = await this.userDataAccess.unblockUser(userId)
      return unblockedUser
    } catch (error) {
      ErrorHandling.processError("Error in unblock, userGetDataUseCase", error)
    }
  }

  /**
   * Unblocks a user based on the user ID.
   * @param userId - The ID of the user to be unblocked.
   * @returns {Promise<any>} - A promise that resolves after unblocking the user.
   */
  async isFriend(personId: Types.ObjectId, userId: Types.ObjectId): Promise<FriendStatus> {
    try {
      if (await this.userDataAccess.isFriend(personId, userId)) return 'friend'
      if (await this.userDataAccess.isRequestedByUser(personId, userId)) return 'requestSent'
      if (await this.userDataAccess.isRequestedByPerson(personId, userId)) return 'requestReceived'
      else return 'stranger'
    } catch (error) {
      ErrorHandling.processError("Error in unblock, userGetDataUseCase", error)
    }
  }

  /**
   * 
   * @param userId - The ID of the user
   * @returns object containing user-name, name, profilePicture, friendsCount
   */
  async getBasicInfo(userId: Types.ObjectId): Promise<UserBasicInfo> {
    try {
      const isUserExisting = await this.userDataAccess.checkUserExisting(userId)
    
      if (!!isUserExisting) {
        const userName =  await this.userDataAccess.getUserNameById(userId)
        const name =  await this.userDataAccess.getNameById(userId)
        const userData = await this.userDataAccess.getUserProfilePictureWithId(userId)
        const friendsCount =  await this.userDataAccess.getFriendsCountById(userId)
        const email =  await this.userDataAccess.getEmailById(userId)
        const phone = await this.userDataAccess.getPhoneById(userId)

        let { profilePicture } = userData
        if (!profilePicture) profilePicture = ''
        return { userName, name, profilePicture, friendsCount, email, phone }
      }

      throw new Error("User not found")
    } catch (error) {
      ErrorHandling.processError('Error in getBasicInfo, GetUserDataUseCase', error)
    }
  }
}
