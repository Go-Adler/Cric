import { Schema, Types } from 'mongoose'

export const notificationSchema = new Schema({
  type: String,
  userName: String,
  read: {
    type: Boolean,
    default: false
  },
  timeStamp:  {
    type: Date,
    default: Date.now,
  },
  postId: Types.ObjectId
})