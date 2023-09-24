export interface messageResponse {
  message?: string;
  error?: string;
  otpVerified?: boolean;
  changePassword?: boolean;
  postData: any;
  invalidOtp?: boolean;
  otpSent?: boolean;
}

export interface I_postResponse {
  uploadFailed?: boolean;
  post?: I_post;
  message?: string
}

export interface I_post {
  content?: {
    text?: string;
    hashtags?: string[];
    mentions?: string[];
    links?: string[];
    multimedia?: string[];
  };
  metrics: {
    timestamp: Date;
  };
  _id?: string;
}
