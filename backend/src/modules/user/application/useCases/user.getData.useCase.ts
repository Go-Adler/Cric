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
}