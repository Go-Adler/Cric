"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginUseCase = void 0;
const bcrypt_utils_1 = require("../../../../utils/bcrypt.utils");
const user_dataAccess_1 = require("../../data/user.dataAccess");
class UserLoginUseCase {
    constructor() {
        this.userLogIn = async (email, inputPassword) => {
            try {
                // get hashedPassword
                const hashedPassword = await this.userDataAccess.getUserPasswordByEmail(email);
                // compare passwords
                const comparePasswords = await this.passwordManager.comparePasswords(inputPassword, hashedPassword ?? '');
                if (comparePasswords === false) {
                    throw new Error('InvalidPassword');
                }
                // Get user id
                const userId = await this.userDataAccess.getUserIdWithEmail(email);
                return userId;
            }
            catch (error) {
                // Handle the error here, you can log it or perform any necessary actions.
                console.error('Error in userLogIn:', error);
                throw error; // Re-throw the error to let the caller handle it.
            }
        };
        this.isVerified = async (email) => {
            try {
                const isVerified = this.userDataAccess.isVerified(email);
                return isVerified;
            }
            catch (error) {
                // Handle the error here, you can log it or perform any necessary actions.
                console.error('Error in isVerified:', error);
                throw error; // Re-throw the error to let the caller handle it.
            }
        };
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
        this.passwordManager = new bcrypt_utils_1.PasswordManager();
    }
}
exports.UserLoginUseCase = UserLoginUseCase;
