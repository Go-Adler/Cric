"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidOtpError = void 0;
class InvalidOtpError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidOtpError';
    }
}
exports.InvalidOtpError = InvalidOtpError;
