"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileDataAccess = void 0;
const user_schema_1 = require("../domain/user.schema");
class UserProfileDataAccess {
    async updateProfilePicture(userId, profilePicture) {
        try {
            await user_schema_1.UserEntity.findByIdAndUpdate(userId, { profilePicture });
        }
        catch (error) {
            console.error('Error in updating profile picture', error);
            throw new Error('Error in updating profile picture');
        }
    }
}
exports.UserProfileDataAccess = UserProfileDataAccess;
