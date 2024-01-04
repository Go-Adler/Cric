"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_Entity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OTPSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    OTP: {
        type: Number,
        required: true,
    },
});
exports.OTP_Entity = mongoose_1.default.model('OTP', OTPSchema);
