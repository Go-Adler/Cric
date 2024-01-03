"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOTP_UseCase = void 0;
const user_otp_dataAccess_1 = require("../../data/user.otp.dataAccess");
const generateOTP_utils_1 = require("../../../../utils/generateOTP.utils");
const awsSes_service_1 = require("../../../../services/awsSes.service");
const nodeMailer_service_1 = require("../../../../services/nodeMailer.service");
class SendOTP_UseCase {
    constructor() {
        /**
         * Send an OTP verification email to the specified email address.
         * @param email - Email address to which the OTP email will be sent.
         * @returns True if the OTP email was sent successfully.
         * @throws Error if there was an issue sending the OTP email.
         */
        this.sendOTP = async (email) => {
            try {
                // Generate a one-time password (OTP)
                const otp = (0, generateOTP_utils_1.generateOTP)();
                // Send the OTP verification email - aws ses
                // await this.awsSesService.sendOtpVerificationEmail(email, otp)
                await this.nodeMailerService.sendMail(email, otp);
                // Store the OTP in the data access layer
                await this.userOtpDataAccess.addOtp(email, otp);
            }
            catch (error) {
                console.error(`Error sending OTP email: ${error.message}`);
                throw new Error("Failed to send OTP email.");
            }
        };
        this.awsSesService = new awsSes_service_1.AwsSesService();
        this.nodeMailerService = new nodeMailer_service_1.NodeMailerService();
        this.userOtpDataAccess = new user_otp_dataAccess_1.UserOtpDataAccess();
    }
}
exports.SendOTP_UseCase = SendOTP_UseCase;
