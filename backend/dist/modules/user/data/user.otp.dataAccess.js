"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOtpDataAccess = void 0;
const user_schema_1 = require("../domain/user.schema");
class UserOtpDataAccess {
    constructor() {
        // store otp data
        this.addOtp = async (email, otp) => {
            try {
                await user_schema_1.UserEntity.findOneAndUpdate({ email }, { otp });
            }
            catch (error) {
                console.error("Error creating OTP:", error);
                return false;
            }
        };
        this.getOtp = async (userId) => {
            try {
                const user = await user_schema_1.UserEntity.findById(userId, {});
                return user?.otp ?? "";
            }
            catch (error) {
                console.error(`Error fetching OTP:`, error);
                return "";
            }
        };
        // remove otp data
        this.removeOtp = async (email) => {
            try {
                await user_schema_1.UserEntity.findOneAndUpdate({ email }, { otp: null });
                return true;
            }
            catch (error) {
                console.error("Error removing OTP:", error);
                return false;
            }
        };
    }
}
exports.UserOtpDataAccess = UserOtpDataAccess;
