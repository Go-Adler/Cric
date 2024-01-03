"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLoginController = void 0;
const user_existing_useCase_1 = require("../../../user/application/useCases/user.existing.useCase");
const user_logIn_useCase_1 = require("../../../user/application/useCases/user.logIn.useCase");
const user_token_useCase_1 = require("../../../user/application/useCases/user.token.useCase");
const user_sendOTP_useCase_1 = require("../../../user/application/useCases/user.sendOTP.useCase");
class AdminLoginController {
    constructor() {
        this.adminLogin = async (req, res, next) => {
            const { email, password } = req.body;
            try {
                const userId = await this.userExistingUseCase.userExistingLogIn(email);
                if (!userId) {
                    return res.json({ userNotExisting: true });
                }
                await this.userLogInUseCase.userLogIn(email, password);
                const token = this.tokenUseCase.generateTokenWithUserId(userId, true);
                res.json({ message: 'Verification success', token });
            }
            catch (error) {
                if (error.message === 'InvalidPassword') {
                    return res.json({ wrongPassword: true });
                }
                else if (error.message === 'NotVerified') {
                    return res.json({ notVerified: true });
                }
                return next(error);
            }
        };
        this.userExistingUseCase = new user_existing_useCase_1.UserExistingUseCase();
        this.userLogInUseCase = new user_logIn_useCase_1.UserLoginUseCase();
        this.tokenUseCase = new user_token_useCase_1.TokenUseCase();
        this.sendOtpUseCase = new user_sendOTP_useCase_1.SendOTP_UseCase();
    }
}
exports.AdminLoginController = AdminLoginController;
