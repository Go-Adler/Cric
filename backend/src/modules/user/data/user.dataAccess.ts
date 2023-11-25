import { Types } from "mongoose"
import { UserEntity } from "./../domain/user.schema"
import { PostEntity } from "../domain/user.postSchema"
import { validateString } from "../../../utils/validateString.utils"
import { handleError } from "../../../utils/handleError.utils"
import { Notification } from '../../../shared/interfaces/user.notification.interface'
import { User } from '../../../shared/interfaces/user.interface'

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
  async createUser(name: string, userName: string, gender: string, email: string, phone: string, password: string) {
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
      return user._id ? user.id : ''
    } catch (error) {
      // Handle errors and log messages
      handleError(error)
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
      // Handle errors and log messages
      handleError(error)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
    }
  }

  /**
   * Verify a user by setting isVerified to true
   * @param userId - The ID of the user to verify
   */
  async verifyUser(userId: Types.ObjectId) {
    try {
      await UserEntity.findByIdAndUpdate(userId, { isVerified: true })
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
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
    } catch (e: any) {
      console.error(e.message)
      handleError(e)
    }
  }

  /**
   * Check if a post belongs to the specified user
   * @param postId - The ID of the post
   * @param currentId - The ID of the current user
   * @returns True if the post belongs to the user, false otherwise
   */
  async checkDifferentUser(postId: Types.ObjectId, currentId: string) {
    try {
      // let currentIdConverted = new Types.ObjectId(currentId)
      const { userId } = (await PostEntity.findById(postId)) as { userId: Types.ObjectId }
      if (userId.toString() === currentId) {
        return false
      } else {
        return userId.toString()
      }

      // else return userId
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
    }
  }

  /**
   * Get socket connections of a user by user ID
   * @param userId - The ID of the user
   * @returns An array of socket connections or an empty array if not found
   */
  async getSocketsWithId(userId: string) {
    try {
      const { socketId } = await UserEntity.findById(userId).select("socketId") as { socketId: [string] }

      return socketId || []
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
    }
  }

  /**
 * Get notification count of a user by user ID
 * @param userId - The ID of the user
 * @returns notification count or 0 if not found
 */
  async getNotificationsCount(userId: Types.ObjectId) {
    try {
      const { notifications } = await UserEntity.findById(userId).select("notifications") as { notifications: [] }
      return notifications.length || 0
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
    }
  }

  /**
  * Get notification count of a user by user ID
  * @param userId - The ID of the user
  * @returns notification count or 0 if not found
  */
  async addNotification(_id: Types.ObjectId, type: string, postId: Types.ObjectId, postUserId: string) {
    try {
      const { userName, profilePicture } = await UserEntity.findById(_id).select('userName profilePicture') as { userName: string, profilePicture: string }
      await UserEntity.findByIdAndUpdate(postUserId, {
        $push: {
          notifications: {
            type,
            userName,
            postId,
            profilePicture
          }
        }
      })
      return { type, userName, postId, timeStamp: Date.now() }
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
    }
  }

  /**
   * Method to get notification of user by user ID.
   * 
   * @param userId - The ID of the user.
   * @returns notifications of user of empty array
  */
  async getNotifications(userId: string) {
    try {
      const userData = await UserEntity.findById(userId).select('notifications').sort({ 'notifications.timeStamp': -1 }) 
      let notifications = userData?.notifications

      if (notifications) {
        notifications = notifications.sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime())
      }
      return notifications || []
    } catch (e: any) {
      console.log(e.message)
      handleError(e)
    }
  }
}
