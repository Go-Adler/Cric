"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
// Function to generate a random otp of length 6
const generateOTP = () => {
    return Math.floor(Math.random() * 900000) + 100000;
};
exports.generateOTP = generateOTP;
