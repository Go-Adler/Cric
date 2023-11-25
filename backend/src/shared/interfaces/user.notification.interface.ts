import { Document, Types } from 'mongoose'

export interface Notification extends Document {
    type: string
    userName: string
    read: boolean
    timeStamp: Date
    postId: Types.ObjectId
    profilePicture: string
}