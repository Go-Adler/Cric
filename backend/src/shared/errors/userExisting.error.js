"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserExistingError = void 0;
class UserExistingError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserExistingError';
    }
}
exports.UserExistingError = UserExistingError;
