"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateString = void 0;
// Helper function to validate string parameters
function validateString(param, paramName) {
    if (typeof param !== "string" || param.length === 0) {
        throw new Error(`Invalid ${paramName}`);
    }
}
exports.validateString = validateString;
