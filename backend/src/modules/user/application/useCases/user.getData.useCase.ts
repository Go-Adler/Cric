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

  getName = async (userId: string): Promise<any> => {
    const userProfilePicture = await this.userDataAccess.getNameById(userId)
    return userProfilePicture
  }

  getUserName = async (userId: string): Promise<any> => {
    const userName = await this.userDataAccess.getUserNameById(userId)
    return userName
  }

  getEmail = async (userId: string): Promise<any> => {
    const email = await this.userDataAccess.getUserNameById(userId)
    return email
  }
}