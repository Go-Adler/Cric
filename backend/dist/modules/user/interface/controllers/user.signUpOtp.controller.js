"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignUpOtpController = void 0;
const invalidOtp_error_1 = require("../../../../shared/errors/invalidOtp.error");
const user_verifyOtp_useCase_1 = require("../../application/useCases/user.verifyOtp.useCase");
const user_token_useCase_1 = require("../../application/useCases/user.token.useCase");
class UserSignUpOtpController {
    constructor() {
        this.verifyOtp = async (req, res, next) => {
            const { otp } = req.body;
            const { userId } = req.user;
            try {
                await this.userVerifyOtpUseCase.verifyOtp(userId, otp);
                return res.status(200).json({ message: 'OTP verification successful', otpVerified: true });
            }
            catch (error) {
                console.error(error);
                if (error instanceof invalidOtp_error_1.InvalidOtpError) {
                    return res.json({ invalidOtp: true });
                }
                return next(error);
            }
        };
        this.userVerifyOtpUseCase = new user_verifyOtp_useCase_1.UserVerifyOtpUseCase();
        this.tokenUseCase = new user_token_useCase_1.TokenUseCase();
    }
}
exports.UserSignUpOtpController = UserSignUpOtpController;
