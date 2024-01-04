"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistingUseCase = void 0;
const user_dataAccess_1 = require("../../data/user.dataAccess");
const userExisting_error_1 = require("../../../../shared/errors/userExisting.error");
const handleError_utils_1 = require("../../../../utils/handleError.utils");
class UserExistingUseCase {
    constructor() {
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
    }
    async userExisting(userName, phone, email) {
        try {
            // Check if the username is already taken
            const existingUserName = await this.userDataAccess.checkUserByUserName(userName);
            if (existingUserName) {
                throw new userExisting_error_1.UserExistingError('User name already taken');
            }
            // Check if the phone is already taken
            const existingPhone = await this.userDataAccess.checkUserByPhone(phone);
            if (existingPhone) {
                throw new userExisting_error_1.UserExistingError('Phone already taken');
            }
            // Check if the email is already taken
            const existingEmail = await this.userDataAccess.checkUserByEmail(email);
            if (existingEmail) {
                throw new userExisting_error_1.UserExistingError('Email already taken');
            }
            return true;
        }
        catch (error) {
            if (error instanceof userExisting_error_1.UserExistingError)
                throw new userExisting_error_1.UserExistingError(error.message);
            handleError_utils_1.ErrorHandling.processError('Error in userExisting, UserExistingUseCase', error);
        }
    }
    async userExistingLogIn(email) {
        // Check if the user existing
        const userId = await this.userDataAccess.checkUserByEmail(email);
        return userId;
    }
}
exports.UserExistingUseCase = UserExistingUseCase;
