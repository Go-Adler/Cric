"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVerified = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_token_useCase_1 = require("../../application/useCases/user.token.useCase");
const user_sendOTP_useCase_1 = require("../../application/useCases/user.sendOTP.useCase");
class isVerified {
    constructor() {
        // Middleware function to verify JWT token
        this.isVerified = async (req, res, next) => {
            try {
                const secretKey = process.env.JWT_SECRET_KEY;
                // Extract the Authorization header
                const authHeader = req.header('Authorization');
                // Check if Authorization header is missing
                if (!authHeader) {
                    return res
                        .status(401)
                        .json({ message: 'Access denied. No token provided.' });
                }
                // Extract token from the Authorization header
                const token = authHeader.split(' ')[1];
                // Check if token is missing
                if (!token) {
                    return res
                        .status(401)
                        .json({ message: 'Access denied. No token provided.' });
                }
                // Verify the token using the provided secret key
                const decoded = jsonwebtoken_1.default.verify(token, secretKey);
                // Attach the decoded user information to the request object
                req.user = decoded;
                const { isVerified } = decoded;
                const { userId } = decoded;
                // if (!isVerified) {
                //   await this.sendOtpUseCase.sendOTP(email)
                //   const token = this.tokenUseCase.generateTokenWithUserId(email, false)
                //   return res.json({ notVerified: true, token })
                // }
                // Proceed to the next middleware 
                next();
            }
            catch (error) {
                // Handle token verification errors
                return res.json({ invalidToken: true });
            }
        };
        this.verifyJwtForOtp = async (req, res, next) => {
            try {
                const secretKey = process.env.JWT_SECRET_KEY;
                // Extract the Authorization header
                const authHeader = req.header('Authorization');
                // Check if Authorization header is missing
                if (!authHeader) {
                    return res
                        .status(401)
                        .json({ message: 'Access denied. No token provided.' });
                }
                // Extract token from the Authorization header
                const forgotToken = authHeader.split(' ')[1];
                // Check if token is missing
                if (!forgotToken) {
                    return res
                        .status(401)
                        .json({ message: 'Access denied. No token provided.' });
                }
                // Verify the token using the provided secret key
                const decoded = jsonwebtoken_1.default.verify(forgotToken, secretKey);
                // Attach the decoded user information to the request object
                req.user = decoded;
                // Proceed to the next middleware
                next();
            }
            catch (error) {
                // Handle token verification errors
                return res.json({ invalidToken: true });
            }
        };
        this.verifyToken = async (req, res) => {
            try {
                const { token } = req.body;
                const secretKey = process.env.JWT_SECRET_KEY;
                jsonwebtoken_1.default.verify(token, secretKey);
                res.json({ validToken: true });
            }
            catch (error) {
                if (error.message === 'jwt malformed') {
                    res.json({ invalidToken: true });
                }
            }
        };
        this.tokenUseCase = new user_token_useCase_1.TokenUseCase();
        this.sendOtpUseCase = new user_sendOTP_useCase_1.SendOTP_UseCase();
    }
}
exports.isVerified = isVerified;
