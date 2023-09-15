export interface I_LoginResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
  };
  userNotExisting?: boolean;
  wrongPassword?: boolean
  notVerified?: boolean
}

export interface I_ForgotPasswordResponse {
  forgotToken?: string,
  otpSent?: boolean
  userNotExisting?: boolean
}

