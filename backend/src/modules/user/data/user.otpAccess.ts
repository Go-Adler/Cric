import { UserEntity } from './../domain/user.schema';

export class UserOtpDataAccess {
  // store otp data
  addOtp = async (email: string, otp: number) => {
    try {
      await UserEntity.findOneAndUpdate({ email }, { otp });
      return true;
    } catch (error) {
      console.error("Error creating OTP:", error);
      return false;
    }
  }


  getOtp = async (email: string) => {
    try {
      console.log(email, 18);
      
      const user = await UserEntity.findOne({ email }).select('otp')
      console.log(user?.otp, 19);
      
      return user?.otp ?? "";
    } catch (error) {
      console.error(`Error fetching OTP for ${email}:`, error);
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
