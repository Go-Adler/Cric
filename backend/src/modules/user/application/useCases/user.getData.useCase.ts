import { Types } from "mongoose"
import { UserDataAccess } from "../../data/user.dataAccess"

export class GetUserDataUseCase {
  private userDataAccess: UserDataAccess

  constructor() {
    this.userDataAccess = new UserDataAccess()
  }

  getProfilePicture = async (userId: string): Promise<any> => {
    const userProfilePicture = await this.userDataAccess.getUserProfilePictureWithId(userId)
    return userProfilePicture
  }

  getUserId = async (userName: string): Promise<any> => {
    const userId = await this.userDataAccess.getUserIdWIthUserName(userName)
    return userId._id
  }

  getName = async (userId: string): Promise<any> => {
    const userProfilePicture = await this.userDataAccess.getNameById(userId)
    return userProfilePicture
  }

  getUserName = async (userId: string): Promise<any> => {
    const userName = await this.userDataAccess.getUserNameById(userId)
    return userName
  }

  getFriendsCount = async (userId: Types.ObjectId): Promise<any> => {
    const friendsCount = await this.userDataAccess.getFriendsCountById(userId)
    return friendsCount
  }

  getEmail = async (userId: Types.ObjectId): Promise<any> => {
    const email = await this.userDataAccess.getEmailById(userId)
    return email
  }

  getAllUsers = async () => {
    const users = await this.userDataAccess.getUsers()
    return users
  }

  blockUser = async (userId: Types.ObjectId) => {
    const users = await this.userDataAccess.blockUser(userId)
    return users
  }

  unblockUser = async (userId: Types.ObjectId) => {
    const users = await this.userDataAccess.unblockUser(userId)
    return users
  }
}