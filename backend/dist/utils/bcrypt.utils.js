"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordManager = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordManager {
    constructor() {
        this.saltRounds = 10;
    }
    async hashPassword(password) {
        return bcrypt_1.default.hash(password, this.saltRounds);
    }
    async comparePasswords(inputPassword, hashedPassword) {
        return bcrypt_1.default.compare(inputPassword, hashedPassword);
    }
}
exports.PasswordManager = PasswordManager;
