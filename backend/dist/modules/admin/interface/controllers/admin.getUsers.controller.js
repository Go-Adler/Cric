"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUsersController = void 0;
const user_getData_useCase_1 = require("../../../user/application/useCases/user.getData.useCase");
class GetUsersController {
    constructor() {
        this.getUsers = async (req, res, next) => {
            try {
                const users = await this.getUserDataUseCase.getAllUsers();
                res.json({ message: 'Verification success', users });
            }
            catch (error) {
                return next(error);
            }
        };
        this.blockUser = async (req, res, next) => {
            try {
                const { userId } = req.body;
                const user = await this.getUserDataUseCase.blockUser(userId);
                res.json({ message: 'user blocked', user });
            }
            catch (error) {
                return next(error);
            }
        };
        this.unblockUser = async (req, res, next) => {
            try {
                const { userId } = req.body;
                const user = await this.getUserDataUseCase.unblockUser(userId);
                res.json({ message: 'user unblocked', user });
            }
            catch (error) {
                return next(error);
            }
        };
        this.getUserDataUseCase = new user_getData_useCase_1.GetUserDataUseCase();
    }
}
exports.GetUsersController = GetUsersController;
