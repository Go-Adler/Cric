import { OTP_Entity } from "../domain/user.otpSchema";

export class UserTempDataAccess {
  // store otp data
  createOTP_Data = async (email: string, OTP: number) => {
    try {
      await OTP_Entity.findOneAndUpdate({ email }, { OTP }, { upsert: true });
      return true;
    } catch (error) {
      console.error("Error creating OTP data:", error);
      return false;
    }
  }

  // get otp with email
  getOTP_ByEmail = async (email: string) => {
    try {
      const otpData = await OTP_Entity.findOne({ email });
      return otpData?.OTP;
    } catch (error) {
      console.error("Error getting OTP data by email:", error);
      throw error
    }
  }
}
