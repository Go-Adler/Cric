import { Document, Types } from 'mongoose'

export type NotificationTypes = 'like' | 'comment' | 'requestReceived' | 'requestAccepted'


export interface Notification extends Document {
    type: NotificationTypes,
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