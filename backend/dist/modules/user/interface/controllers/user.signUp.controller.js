"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignUpController = void 0;
const user_existing_useCase_1 = require("../../application/useCases/user.existing.useCase");
const user_sendOTP_useCase_1 = require("../../application/useCases/user.sendOTP.useCase");
const userExisting_error_1 = require("../../../../shared/errors/userExisting.error");
const user_createUser_useCase_1 = require("../../application/useCases/user.createUser.useCase");
const user_token_useCase_1 = require("../../application/useCases/user.token.useCase");
class UserSignUpController {
    constructor() {
        this.userSignUp = async (req, res, next) => {
            try {
                const { userName, phone, email } = req.body;
                console.log(req.body);
                // Ensure email is in lowercase for consistency
                const userData = { ...req.body, email: email.toLowerCase(), userName: userName.toLowerCase() };
                // Check if the user already exists
                await this.userExistingUseCase.userExisting(userName, phone, userData.email);
                // Create the user
                const userId = await this.createUserUseCase.createUser(userData);
                // Send OTP to the user's email
                await this.sendOTP_UseCase.sendOTP(userData.email);
                // Generate a verification token
                const verifyToken = this.tokenUseCase.generateTokenWithUserId(userId, false);
                return res.status(200).json({ message: "User sign-up successful", verifyToken });
            }
            catch (error) {
                if (error instanceof userExisting_error_1.UserExistingError) {
                    return res.status(200).json({ error: error.message });
                }
                return next(error);
            }
        };
        this.userExistingUseCase = new user_existing_useCase_1.UserExistingUseCase();
        this.sendOTP_UseCase = new user_sendOTP_useCase_1.SendOTP_UseCase();
        this.createUserUseCase = new user_createUser_useCase_1.CreateUserUseCase();
        this.tokenUseCase = new user_token_useCase_1.TokenUseCase();
    }
}
exports.UserSignUpController = UserSignUpController;
