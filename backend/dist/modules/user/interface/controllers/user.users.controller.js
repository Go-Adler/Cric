"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_users_useCase_1 = require("../../application/useCases/user.users.useCase");
const user_getAwsUrl_useCase_1 = require("../../application/useCases/user.getAwsUrl.useCase");
class UsersController {
    constructor() {
        this.findUsers = async (req, res, next) => {
            const { input } = req.body;
            try {
                const usersWithoutUrl = await this.usersUseCase.findUsers(input);
                const users = await this.getAwsUrlUseCase.getImageUrlUsersFind(usersWithoutUrl);
                res.json({ users });
            }
            catch (error) {
                return next(error);
            }
        };
        this.usersUseCase = new user_users_useCase_1.UsersUseCase();
        this.getAwsUrlUseCase = new user_getAwsUrl_useCase_1.GetAwsUrlUseCase();
    }
}
exports.UsersController = UsersController;
