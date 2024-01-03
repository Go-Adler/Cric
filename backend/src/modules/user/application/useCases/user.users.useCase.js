"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersUseCase = void 0;
const user_dataAccess_1 = require("../../data/user.dataAccess");
class UsersUseCase {
    constructor() {
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
    }
    async findUsers(input) {
        const users = await this.userDataAccess.findUsers(input);
        return users;
    }
}
exports.UsersUseCase = UsersUseCase;
