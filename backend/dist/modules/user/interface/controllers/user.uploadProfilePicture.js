"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataController = void 0;
const user_getData_useCase_1 = require("../../application/useCases/user.getData.useCase");
class UserDataController {
    constructor() {
        this.userProfilePictureUpload = async (req, res, next) => {
            try {
            }
            catch (error) {
                return next(error);
            }
        };
        this.userDataUseCase = new user_getData_useCase_1.GetUserDataUseCase();
    }
}
exports.UserDataController = UserDataController;
