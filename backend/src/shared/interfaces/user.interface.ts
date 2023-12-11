import { Types, Document } from "mongoose"
import { Notification } from "./user.notification.interface"
import { IChat } from './user.message.interface'

export interface User extends Document {
  name: string
  otp?: number
  email: string
  phone: string,
  chats: IChat[]
  gender: string
  password: string
  userName: string
  isAdmin: boolean
  socketId: string[]
  isBlocked: boolean
  isVerified: boolean
  profilePicture?: string
  postIds: Types.ObjectId[]
  friends: Types.ObjectId[]
  savedPosts: Types.ObjectId[]
  notifications: Notification[]
  friendRequestsSent: Types.ObjectId[]
  friendRequestsReceived: Types.ObjectId[],
}
