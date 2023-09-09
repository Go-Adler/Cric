import { UserEntity } from './../domain/user.schema';

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
      await UserEntity.create({
        name,
        userName,
        gender,
        email,
        phone,
        password,
      })
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }

  // get user data with user name
  async getUserByUserName(userName: string) {
    try {
      const user = await UserEntity.findOne({ userName })
      return user
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }

  // check userName already existing
  async checkUserByUserName(userName: string) {
    try {
      const user = await UserEntity.findOne({ userName })
      return user ? true : false
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }

  // get user data with email
  async getUserByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }

  // get user id with email
  async getUserIdWithEmail(email: string) {
    try {
      const userId = await UserEntity.findOne({ email }).select('_id')
      if (userId) return userId.toString()
    } catch (e: any) {
      // handle the error here
      console.error('Error in getUserIdWithEmail:', e.message)
      throw e // Re-throw the error to let the caller handle it.
    }
  }

  // check email already exist
  async checkUserByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user ? true : false
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }

  // get user data with phone
  async getUserByPhone(phone: string) {
    try {
      const user = await UserEntity.findOne({ phone })
      return user
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }

  // check phone already exist
  async checkUserByPhone(phone: string) {
    try {
      const user = await UserEntity.findOne({ phone })
      return user ? true : false
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }

  // get user password with email
  async getUserPasswordByEmail(email: string) {
    try {
      const user = await UserEntity.findOne({ email })
      return user?.password || ''
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
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
      // handle the error here
      console.log(e.message)
    }
  }

  async verifyUser(email: string) {
    try {
      await UserEntity.findOneAndUpdate({ email }, { isVerified: true })
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }

  async changePassword(email: string, password: string) {
    try {
      await UserEntity.findOneAndUpdate({ email }, { password })
    } catch (e: any) {
      // handle the error here
      console.log(e.message)
    }
  }
}
