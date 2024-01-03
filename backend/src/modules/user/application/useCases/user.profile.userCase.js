"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileUseCase = void 0;
const user_profile_dataAccess_1 = require("../../data/user.profile.dataAccess");
class UserProfileUseCase {
    constructor() {
        this.updateProfilePicture = async (userId, profilePicture) => {
            try {
                await this.userProfileDataAccess.updateProfilePicture(userId, profilePicture);
            }
            catch (error) {
                console.error('Error in updating profile picture', error);
                throw new Error('Error updating profile picture');
            }
        };
        this.userProfileDataAccess = new user_profile_dataAccess_1.UserProfileDataAccess();
    }
}
exports.UserProfileUseCase = UserProfileUseCase;
