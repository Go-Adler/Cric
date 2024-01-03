"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserChangePasswordController = void 0;
const invalidOtp_error_1 = require("../../../../shared/errors/invalidOtp.error");
const user_token_useCase_1 = require("../../application/useCases/user.token.useCase");
const user_changePassword_useCase_1 = require("../../application/useCases/user.changePassword.useCase");
const bcrypt_utils_1 = require("../../../../utils/bcrypt.utils");
class UserChangePasswordController {
    constructor() {
        this.changePassword = async (req, res, next) => {
            try {
                const { password } = req.body;
                const { userId } = req.user;
                const passwordHash = await this.passwordManager.hashPassword(password);
                await this.changePasswordUseCase.changePassword(userId, passwordHash);
                const verifyToken = this.tokenUseCase.generateTokenWithUserId(userId, true);
                return res
                    .status(200)
                    .json({
                    message: 'Password successfully changed',
                    verifyToken,
                    changePassword: true,
                });
            }
            catch (error) {
                console.error(error.stack);
                if (error instanceof invalidOtp_error_1.InvalidOtpError) {
                    return res.status(401).json({ messages: 'Invalid OTP' });
                }
                return next(error);
            }
        };
        this.tokenUseCase = new user_token_useCase_1.TokenUseCase();
        this.changePasswordUseCase = new user_changePassword_useCase_1.UserChangePasswordUseCase();
        this.passwordManager = new bcrypt_utils_1.PasswordManager();
    }
}
exports.UserChangePasswordController = UserChangePasswordController;
