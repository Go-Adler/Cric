import { Schema } from 'mongoose'

import { Notification } from '../../../shared/interfaces/user.notification.interface'

export const notificationSchema = new Schema<Notification>({
  type: {
    type: String, 
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false
  },
  timeStamp:  {
    type: Date,
    default: Date.now,
  },
  postId: {
    type: Schema.Types.ObjectId,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  }
})