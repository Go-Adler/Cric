"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChangePasswordUseCase = void 0;
const user_dataAccess_1 = require("../../data/user.dataAccess");
class UserChangePasswordUseCase {
    constructor() {
        this.changePassword = async (userId, password) => {
            try {
                await this.userDataAccess.changePassword(userId, password);
            }
            catch (error) {
                throw error;
            }
        };
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
    }
}
exports.UserChangePasswordUseCase = UserChangePasswordUseCase;
