import { Types } from "mongoose"
import { UserProfileDataAccess } from "../../data/user.profileDataAccess"

export class UserProfileUseCase {
  private userProfileDataAccess: UserProfileDataAccess

  constructor() {
    this.userProfileDataAccess = new UserProfileDataAccess()
  }

  updateProfilePicture = async (userId: Types.ObjectId, profilePicture: string) => {
    try {
      await this.userProfileDataAccess.updateProfilePicture(userId, profilePicture)
    } catch (error) {
        console.error('Error in updating profile picture', error)
        throw new Error('Error updating profile picture')
    }
  }
}
