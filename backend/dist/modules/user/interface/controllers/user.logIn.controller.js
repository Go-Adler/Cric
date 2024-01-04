"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginController = void 0;
const user_token_useCase_1 = require("../../application/useCases/user.token.useCase");
const user_logIn_useCase_1 = require("../../application/useCases/user.logIn.useCase");
const user_sendOTP_useCase_1 = require("../../application/useCases/user.sendOTP.useCase");
const user_existing_useCase_1 = require("../../application/useCases/user.existing.useCase");
class UserLoginController {
    constructor() {
        this.userLogin = async (req, res, next) => {
            const { email, password } = req.body;
            try {
                // Check if the user exists in the database using the email
                const isUserExisting = await this.userExistingUseCase.userExistingLogIn(email.toLowerCase());
                // If the user does not exist, return a response with userNotExisting flag
                if (!isUserExisting) {
                    return res.json({ userNotExisting: true });
                }
                // If the user exists, get the user id by verifying the email and password
                const userId = await this.userLogInUseCase.userLogIn(email, password);
                // Check if the user is verified using the email
                let isVerified = await this.userLogInUseCase.isVerified(email);
                isVerified = !!isVerified;
                // If the user id is valid, generate a token with the user id and the isVerified flag
                if (userId) {
                    const token = this.tokenUseCase.generateTokenWithUserId(userId, isVerified);
                    // If the user is verified, return a response with a success message and the token
                    if (isVerified) {
                        res.json({ message: "Verification success", token });
                    }
                    else {
                        // If the user is not verified, send an OTP to the email and return a response with notVerified flag and the token
                        await this.sendOtpUseCase.sendOTP(email);
                        res.json({ notVerified: true, token });
                    }
                }
            }
            catch (error) {
                if (error.message === "InvalidPassword") {
                    return res.json({ wrongPassword: true });
                }
                else if (error.message === "NotVerified") {
                    return res.json({ notVerified: true });
                }
                return next(error);
            }
        };
        this.tokenUseCase = new user_token_useCase_1.TokenUseCase();
        this.sendOtpUseCase = new user_sendOTP_useCase_1.SendOTP_UseCase();
        this.userLogInUseCase = new user_logIn_useCase_1.UserLoginUseCase();
        this.userExistingUseCase = new user_existing_useCase_1.UserExistingUseCase();
    }
}
exports.UserLoginController = UserLoginController;
