import mongoose from 'mongoose'

import { notificationSchema } from './user.notificationSchema'
import { chatSchema } from './user.chat.schema'
import { User } from '../../../shared/interfaces/user.interface'

const userSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number
  },
  postIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  savedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  friendRequestsReceived: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  friendRequestsSent: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  socketId: {
    type: [String],
    default: []
  },
  notifications: {
    type: [notificationSchema],
    default: []
  },
  chats: {
    type: [chatSchema],
    default: []
  }
})


export const UserEntity = mongoose.model<User>('Users', userSchema)