import { Document, Types } from 'mongoose'

export interface Notification extends Document {
    type: string
    userName: string,
    userId: Types.ObjectId,
    read: boolean
    timeStamp: Date
    postId: Types.ObjectId
    profilePicture?: string
}

export interface NotificationMarkAsReadResponse {
    success: boolean;
    message: string;
    updatedNotification: Notification;
}