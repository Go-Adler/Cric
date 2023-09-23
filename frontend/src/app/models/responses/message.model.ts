export interface messageResponse {
  message?: string,
  error?: string,
  otpVerified?: boolean
  changePassword?: boolean
  postData: any
  invalidOtp?: boolean,
  otpSent?: boolean
}

export interface I_postResponse {
  uploadFailed?: boolean,
  uploadSuccess?: boolean
}