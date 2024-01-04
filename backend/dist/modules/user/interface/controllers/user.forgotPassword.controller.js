"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserForgotPasswordController = void 0;
const user_existing_useCase_1 = require("../../application/useCases/user.existing.useCase");
const user_sendOTP_useCase_1 = require("../../application/useCases/user.sendOTP.useCase");
const user_token_useCase_1 = require("../../application/useCases/user.token.useCase");
class UserForgotPasswordController {
    constructor() {
        this.forgotPassword = async (req, res, next) => {
            const { email } = req.body;
            try {
                const userId = await this.userExistingUseCase.userExistingLogIn(email);
                if (!userId) {
                    return res.json({ userNotExisting: true });
                }
                const verifyToken = this.tokenUseCase.generateTokenWithUserId(userId, true);
                await this.sendOtpUseCase.sendOTP(email);
                res.json({ otpSent: true, verifyToken });
            }
            catch (error) {
                return next(error);
            }
        };
        this.userExistingUseCase = new user_existing_useCase_1.UserExistingUseCase();
        this.sendOtpUseCase = new user_sendOTP_useCase_1.SendOTP_UseCase();
        this.tokenUseCase = new user_token_useCase_1.TokenUseCase();
    }
}
exports.UserForgotPasswordController = UserForgotPasswordController;
