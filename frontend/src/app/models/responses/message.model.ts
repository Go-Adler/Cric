export interface messageResponse {
  message?: string
  error?: string
  otpVerified?: boolean
  changePassword?: boolean
  invalidOtp?: boolean
  otpSent?: boolean
}

interface PersonDetails {
  name: string,
  userName: string,
  profilePicture: string
}

export interface I_postResponse {
  post: I_post
  message?: string
  comments?: I_post
  uploadFailed?: boolean
}

export interface I_post {
  sameUser?: boolean
  content?: {
    text?: string
    hashtags?: string[]
    mentions?: string[]
    links?: string[]
    multimedia?: string[]
  }
  metrics: {
    timestamp: Date
  }
  _id?: string
  personDetails: PersonDetails
}


