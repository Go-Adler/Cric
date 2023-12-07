import { Types } from "mongoose"
import { UserEntity } from "../domain/user.schema"

export class UserProfileDataAccess {
    async updateProfilePicture(userId: Types.ObjectId, profilePicture: string) {
        try {
            await UserEntity.findByIdAndUpdate(userId, { profilePicture })
        } catch (error) {
            console.error('Error in updating profile picture', error)
            throw new Error('Error in updating profile picture')
        }
    }
}