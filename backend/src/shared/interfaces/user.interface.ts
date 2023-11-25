import { Types } from 'mongoose'

export interface PostLikeRequestBody {
  postId: Types.ObjectId;
}

export interface User extends Document {
  name: string;
  profilePicture?: string;
  userName: string;
  gender: string;
  email: string;
  phone: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  isAdmin: boolean;
  otp?: number;
  postIds: Types.ObjectId[];
  savedPosts: Types.ObjectId[];
  friends: Types.ObjectId[];
  socketId: string[];
  notifications: Notification[];
}