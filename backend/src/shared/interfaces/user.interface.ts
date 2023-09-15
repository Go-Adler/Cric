import { Post } from "./post.interface"

export interface I_User extends Document {
  name: string;
  profilePicture?: string; 
  userName: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  otp?: number;
  isAdmin: boolean
  posts: Post[]
  isBlocked: boolean
}