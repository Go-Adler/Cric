export interface messageResponse {
  message?: string,
  error?: string,
  otpVerified?: boolean
  changePassword?: boolean
  postData: any
  invalidOtp?: boolean
}