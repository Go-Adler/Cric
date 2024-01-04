"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResendOtpController = void 0;
const user_sendOTP_useCase_1 = require("../../application/useCases/user.sendOTP.useCase");
const user_token_useCase_1 = require("../../application/useCases/user.token.useCase");
const user_getData_useCase_1 = require("../../application/useCases/user.getData.useCase");
class UserResendOtpController {
    constructor() {
        this.resendOtp = async (req, res, next) => {
            const { userId } = req.user;
            try {
                const email = await this.getUserDataUseCase.getEmail(userId);
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
        this.getUserDataUseCase = new user_getData_useCase_1.GetUserDataUseCase();
        this.sendOtpUseCase = new user_sendOTP_useCase_1.SendOTP_UseCase();
        this.tokenUseCase = new user_token_useCase_1.TokenUseCase();
    }
}
exports.UserResendOtpController = UserResendOtpController;
