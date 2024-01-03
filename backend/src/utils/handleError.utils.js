"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandling = void 0;
// This class handles error logging
class ErrorHandling {
    // This static method logs the error message and throws an error
    static processError(message, error) {
        console.error(`${message}: ${error.message}`);
        throw new Error(error.message);
    }
}
exports.ErrorHandling = ErrorHandling;
