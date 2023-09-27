import { Types } from 'mongoose'
import { UserEntity } from './../domain/user.schema'

export class UserDataAccess {
  // Create a new user
  async createUser(
    name: string,
    userName: string,
    gender: string,
    email: string,
    phone: string,
    password: string
  ) {
    try {
      const user = await UserEntity.create({
        name,
        userName,
        gender,
        email,
        phone,
        password,
      })
      return user._id
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get user data with user name
  async getUserByUserName(userName: string) {
    try {
      const user = await UserEntity.findOne({ userName })
      return user
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // check userName already existing
  async checkUserByUserName(userName: string) {
    try {
      const user = await UserEntity.findOne({ userName })
      return user ? true : false
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get user data with email
  async getUserByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get name with _id
  async getNameById(userId: string) {
    try {
      const user = await UserEntity.findById(userId, { _id: 0, name: 1 })
      return user?.name ?? 'User not found'
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get email with _id
  async getEmailById(userId: Types.ObjectId) {
    try {
      const user = await UserEntity.findById(userId, { _id: 0, email: 1 })
      return user?.email ?? 'User not found'
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get userName with _id
  async getUserNameById(userId: string) {
    try {
      const user = await UserEntity.findById(userId, { _id: 0, userName: 1 })
      return user?.userName ?? 'User not found'
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get user id with email
  async getUserIdWithEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user?._id
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // check email already exist
  async checkUserByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return (user?._id && !user?.isBlocked) ? user?._id : false
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get user data with phone
  async getUserByPhone(phone: string) {
    try {
      const user = await UserEntity.findOne({ phone })
      return user
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // check phone already exist
  async checkUserByPhone(phone: string) {
    try {
      const user = await UserEntity.findOne({ phone })
      return user ? true : false
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get user password with email
  async getUserPasswordByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user?.password || ''
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get user password with email
  async isVerified(email: string) {
    try {
      const { isVerified } = await UserEntity.findOne({ email }).select<{
        isVerified: boolean
      }>('isVerified')
      return isVerified
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  async verifyUser(userId: Types.ObjectId) {
    try {
      await UserEntity.findByIdAndUpdate(userId, { isVerified: true })
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  async changePassword(userId: Types.ObjectId, password: string) {
    try {
      await UserEntity.findByIdAndUpdate(userId, { password })
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get profile picture with id
  async getUserProfilePictureWithId(id: string) {
    try {
      const userProfilePicture = await UserEntity.findById(id).select(
        'profilePicture'
      )
      return userProfilePicture?.profilePicture
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get profile picture with id
  async getUsers() {
    try {
      const users = await UserEntity.find({ isAdmin: false })
      return users
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  // get profile picture with id
  async unblockUser(userId: Types.ObjectId) {
    try {
      const users = await UserEntity.findByIdAndUpdate(userId, { isBlocked: false }, { new: true })
      return users
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }
  
  // get profile picture with id
  async blockUser(userId: Types.ObjectId) {
    try {
      const users = await UserEntity.findByIdAndUpdate(userId, { isBlocked: true }, { new: true })
      return users
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }
}
