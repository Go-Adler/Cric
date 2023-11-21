import { Schema } from 'mongoose'

export const notificationSchema = new Schema({
  text: String,
  timeStamp:  {
    default: Date.now,
    type: Date
  }
})