"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserVerifyOtpUseCase = void 0;
const user_otp_dataAccess_1 = require("../../data/user.otp.dataAccess");
const user_dataAccess_1 = require("../../data/user.dataAccess");
const invalidOtp_error_1 = require("../../../../shared/errors/invalidOtp.error");
const handleError_utils_1 = require("../../../../utils/handleError.utils");
class UserVerifyOtpUseCase {
    constructor() {
        this.verifyOtp = async (userId, otp) => {
            try {
                // Check if the otp matches
                const OTP = await this.userOtpDataAccess.getOtp(userId);
                if (OTP !== otp) {
                    throw new invalidOtp_error_1.InvalidOtpError('Incorrect otp');
                }
                await this.userDataAccess.verifyUser(userId);
                return true;
            }
            catch (error) {
                handleError_utils_1.ErrorHandling.processError('Error in verifyOTP, UserVerifyOTPUseCase', error);
            }
        };
        this.userOtpDataAccess = new user_otp_dataAccess_1.UserOtpDataAccess();
        this.userDataAccess = new user_dataAccess_1.UserDataAccess();
    }
}
exports.UserVerifyOtpUseCase = UserVerifyOtpUseCase;
