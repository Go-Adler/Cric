import { Types } from "mongoose"
import { UserEntity } from "../domain/user.schema"
import { PostEntity } from "../domain/user.postSchema"
import { validateString } from "../../../utils/validateString.utils"
import { ErrorHandling } from "../../../utils/handleError.utils"

// User Data Access Class
export class UserDataAccess {
  /**
   * Create a new user
   * @param name - The name of the user
   * @param userName - The username of the user
   * @param gender - The gender of the user
   * @param email - The email of the user
   * @param phone - The phone number of the user
   * @param password - The password of the user
   * @returns The ID of the created user
   */
  async createUser(
    name: string,
    userName: string,
    gender: string,
    email: string,
    phone: string,
    password: string
  ) {
    try {
      // Validate input parameters
      validateString(name, "name")
      validateString(userName, "userName")
      validateString(gender, "gender")
      validateString(email, "email")
      validateString(phone, "phone")
      validateString(password, "password")

      // Create a new user using the UserEntity model
      const user = await UserEntity.create({
        name,
        userName,
        gender,
        email,
        phone,
        password,
      })

      // Return the user's ID
      return user._id ? user.id : ""
    } catch (error) {
      ErrorHandling.processError("Error in createUser, userDataAccess", error)
    }
  }

  /**
   * Retrieve user data by username
   * @param userName - The username of the user
   * @returns The user data or null if not found
   */
  async getUserByUserName(userName: string) {
    try {
      // Validate input parameter
      validateString(userName, "userName")

      // Find user by username using the UserEntity model
      return await UserEntity.findOne({ userName })
    } catch (error) {
      ErrorHandling.processError("Error in getUserByUserName, userDataAccess", error)
    }
  }

  /**
   * Check if a username already exists
   * @param userName - The username to check
   * @returns True if the username exists, false otherwise
   */
  async checkUserByUserName(userName: string) {
    try {
      const user = await UserEntity.findOne({ userName })
      return user ? true : false
    } catch (error) {
      ErrorHandling.processError("Error in checkUserByUserName, userDataAccess", error)
    }
  }

  /**
   * Get user data by email
   * @param email - The email of the user
   * @returns The user data or null if not found
   */
  async getUserByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user
    } catch (error) {
      ErrorHandling.processError("Error in getUserByEmail, userDataAccess", error)
    }
  }

  /**
   * Get user name by user ID
   * @param userId - The ID of the user
   * @returns The user's name or "User not found" if not found
   */
  async getNameById(userId: string) {
    try {
      const user = await UserEntity.findById(userId, { _id: 0, name: 1 })
      return user?.name ?? "User not found"
    } catch (error) {
      ErrorHandling.processError("Error in getNameById, userDataAccess", error)
    }
  }

  /**
   * Get email by user ID
   * @param userId - The ID of the user
   * @returns The user's email or "User not found" if not found
   */
  async getEmailById(userId: Types.ObjectId) {
    try {
      const user = await UserEntity.findById(userId, { _id: 0, email: 1 })
      return user?.email ?? "User not found"
    } catch (error) {
      ErrorHandling.processError("Error in getEmailById, userDataAccess", error)
    }
  }

  /**
   * Get the count of friends by user ID
   * @param userId - The ID of the user
   * @returns The count of friends or 0 if not found
   */
  async getFriendsCountById(userId: Types.ObjectId) {
    try {
      const user = await UserEntity.findById(userId, { _id: 0, friends: 1 })
      return user?.friends.length || 0
    } catch (error) {
      ErrorHandling.processError("Error in getFriendsCountById, userDataAccess", error)
    }
  }

  /**
   * Get user name by user ID
   * @param userId - The ID of the user
   * @returns The user's name or "User not found" if not found
   */
  async getUserNameById(userId: string) {
    try {
      const user = await UserEntity.findById(userId, { _id: 0, userName: 1 })
      return user?.userName ?? "User not found"
    } catch (error) {
      ErrorHandling.processError("Error in getUserNameById, userDataAccess", error)
    }
  }

  /**
   * Get user ID by email
   * @param email - The email of the user
   * @returns The user ID or null if not found
   */
  async getUserIdWithEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user?._id || null
    } catch (error) {
      ErrorHandling.processError("Error in getUserIdWithEmail, userDataAccess", error)
    }
  }

  /**
   * Check if an email already exists
   * @param email - The email to check
   * @returns The user ID if the email exists and the user is not blocked, false otherwise
   */
  async checkUserByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user?._id && !user?.isBlocked ? user?._id : false
    } catch (error) {
      ErrorHandling.processError("Error in checkUserByEmail, userDataAccess", error)
    }
  }

  /**
   * Get user data by phone number
   * @param phone - The phone number of the user
   * @returns The user data or null if not found
   */
  async getUserByPhone(phone: string) {
    try {
      const user = await UserEntity.findOne({ phone })
      return user
    } catch (error) {
      ErrorHandling.processError("Error in getUserByPhone, userDataAccess", error)
    }
  }

  /**
   * Check if a phone number already exists
   * @param phone - The phone number to check
   * @returns True if the phone number exists, false otherwise
   */
  async checkUserByPhone(phone: string) {
    try {
      const user = await UserEntity.findOne({ phone })
      return user ? true : false
    } catch (error) {
      ErrorHandling.processError("Error in checkUserByPhone, userDataAccess", error)
    }
  }

  /**
   * Get user password by email
   * @param email - The email of the user
   * @returns The user password or an empty string if not found
   */
  async getUserPasswordByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user?.password || ""
    } catch (error) {
      ErrorHandling.processError("Error in getUserPasswordByEmail, userDataAccess", error)
    }
  }

  /**
   * Check if a user's email is verified
   * @param email - The email of the user
   * @returns True if the email is verified, false otherwise
   */
  async isVerified(email: string) {
    try {
      const { isVerified } = await UserEntity.findOne({ email }).select<{
        isVerified: boolean
      }>("isVerified")
      return isVerified
    } catch (error) {
      ErrorHandling.processError("Error in isVerified, userDataAccess", error)
    }
  }

  /**
   * Verify a user by setting isVerified to true
   * @param userId - The ID of the user to verify
   */
  async verifyUser(userId: Types.ObjectId) {
    try {
      await UserEntity.findByIdAndUpdate(userId, { isVerified: true })
    } catch (error) {
      ErrorHandling.processError("Error in verifyUser, userDataAccess", error)
    }
  }

  /**
   * Change the password for a user
   * @param userId - The ID of the user
   * @param password - The new password
   */
  async changePassword(userId: Types.ObjectId, password: string) {
    try {
      await UserEntity.findByIdAndUpdate(userId, { password })
    } catch (error) {
      ErrorHandling.processError("Error in changePassword, userDataAccess", error)
    }
  }

  /**
   * Get the profile picture by user ID
   * @param id - The ID of the user
   * @returns The user's profile picture or null if not found
   */
  async getUserProfilePictureWithId(id: string) {
    try {
      const userProfilePicture = await UserEntity.findById(id).select("profilePicture")
      return userProfilePicture?.profilePicture
    } catch (error) {
      ErrorHandling.processError("Error in getUserProfilePictureWithId, userDataAccess", error)
    }
  }

  /**
   * Get user ID by user name
   * @param userName - The user name
   * @returns The user ID or null if not found
   */
  async getUserIdWithUserName(userName: string) {
    try {
      const userId = await UserEntity.find({ userName }).select("_id")
      return userId[0] || null
    } catch (error) {
      ErrorHandling.processError("Error in getUserIdWithUserName, userDataAccess", error)
    }
  }

  /**
   * Get all non-admin users
   * @returns An array of non-admin users
   */
  async getUsers() {
    try {
      const users = await UserEntity.find({ isAdmin: false })
      return users
    } catch (error) {
      ErrorHandling.processError("Error in getUsers, userDataAccess", error)
    }
  }

  /**
   * Find users based on input (case-insensitive) in username, email, or name
   * @param input - The input to search for
   * @returns An array of users matching the search criteria
   */
  async findUsers(input: string) {
    try {
      const users = await UserEntity.find(
        {
          isAdmin: false,
          $or: [
            { userName: { $regex: input, $options: "i" } },
            { email: { $regex: input, $options: "i" } },
            { name: { $regex: input, $options: "i" } },
          ],
        },
        "_id userName profilePicture name"
      )

      return users
    } catch (error) {
      ErrorHandling.processError("Error in findUsers, userDataAccess", error)
    }
  }

  /**
   * Unblock a user by setting isBlocked to false
   * @param userId - The ID of the user to unblock
   * @returns The updated user object
   */
  async unblockUser(userId: Types.ObjectId) {
    try {
      const user = await UserEntity.findByIdAndUpdate(userId, { isBlocked: false }, { new: true })
      return user
    } catch (error) {
      ErrorHandling.processError("Error in unblockUser, userDataAccess", error)
    }
  }

  /**
   * Block a user by setting isBlocked to true
   * @param userId - The ID of the user to block
   * @returns The updated user object
   */
  async blockUser(userId: Types.ObjectId) {
    try {
      const user = await UserEntity.findByIdAndUpdate(userId, { isBlocked: true }, { new: true })
      return user
    } catch (error) {
      ErrorHandling.processError("Error in blockUser, userDataAccess", error)
    }
  }

  /**
   * Add a socket connection to a user
   * @param userName - The username of the user
   * @param socketId - The ID of the socket connection
   */
  async addSocketId(userName: string, socketId: string) {
    try {
      await UserEntity.findOneAndUpdate({ userName }, { $push: { socketId } })
    } catch (error) {
      ErrorHandling.processError("Error in addSocketId, userDataAccess", error)
    }
  }

  /**
   * Remove a socket connection from a user
   * @param userName - The username of the user
   * @param socketId - The ID of the socket connection to remove
   */
  async removeSocketId(userName: string, socketId: string) {
    try {
      await UserEntity.findOneAndUpdate({ userName }, { $pull: { socketId } })
    } catch (error) {
      ErrorHandling.processError("Error in removeSocketId, userDataAccess", error)
    }
  }

  /**
   * Check if a post belongs to the specified user
   * @param postId - The ID of the post
   * @param currentId - The ID of the current user
   * @returns false if the post belongs to the user, userId otherwise
   */
  async checkDifferentUser(postId: Types.ObjectId, currentId: string): Promise<boolean | Types.ObjectId> {
    try {
      const { userId } = (await PostEntity.findById(postId)) as { userId: Types.ObjectId }
      if (userId.toString() === currentId) {
        return false
      } else {
        return userId
      }
    } catch (error) {
      ErrorHandling.processError("Error in checkDifferentUser, userDataAccess", error)
    }
  }

  /**
 * Get socket connections of a user by user ID
 * @param userId - The ID of the user
 * @returns An array of socket connections or an empty array if not found
 */
  async getSocketsWithId(userId: Types.ObjectId) {
    try {
      const { socketId } = (await UserEntity.findById(userId).select("socketId")) as {
        socketId: string[]
      }

      return socketId || []
    } catch (error) {
      ErrorHandling.processError("Error in getSocketsWithId, userDataAccess", error)
    }
  }
}