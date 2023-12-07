import { Types } from 'mongoose'
import { UserEntity } from '../domain/user.schema';

export class UserOtpDataAccess {
  // store otp data
  addOtp = async (email: string, otp: number) => {
    try {
      const user = await UserEntity.findOneAndUpdate({ email }, { otp });
      return true;
    } catch (error) {
      console.error("Error creating OTP:", error);
      return false;
    }
  }


  getOtp = async (userId: Types.ObjectId) => {
    try {
      const user = await UserEntity.findById(userId, {})
      return user?.otp ?? "";
    } catch (error) {
      console.error(`Error fetching OTP:`, error);
      return "";
    }
  };
  
  

  // remove otp data
  removeOtp = async (email: string) => {
    try {
      await UserEntity.findOneAndUpdate({ email }, { otp: null });
      return true;
    } catch (error) {
      console.error("Error removing OTP:", error);
      return false;
    }
  }
}
