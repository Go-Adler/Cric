"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WrongPasswordError = void 0;
class WrongPasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = 'WrongPasswordError';
    }
}
exports.WrongPasswordError = WrongPasswordError;
