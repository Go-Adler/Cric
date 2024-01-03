"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUseCase = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenUseCase {
    generateTokenWithUserId(userId, isVerified) {
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ isVerified, userId }, secretKey, {
            expiresIn: '1h',
        });
        return token;
    }
}
exports.TokenUseCase = TokenUseCase;
