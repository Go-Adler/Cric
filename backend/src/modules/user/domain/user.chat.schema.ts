import mongoose from 'mongoose'
import { IChat, IChatText } from '../../../shared/interfaces/user.message.interface'

const chatTextSchema = new mongoose.Schema<IChatText>({
  message: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    require: true,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
    required: true,
  },
  sendByUser: {
    type: Boolean,
    required: true,
    default: true
  }
})

export const chatSchema = new mongoose.Schema<IChat>({
  personId: mongoose.Types.ObjectId,
  chatTexts: [chatTextSchema],
})
