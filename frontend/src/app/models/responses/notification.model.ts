  export interface Notification {
    type: string
    userName: string
    read: boolean
    timeStamp: Date
    postId: string
    profilePicture: string,
    userId: string,
    _id: string
  }

  export interface NotificationResponse {
    notifications: Notification[];
  }

  export interface NotificationMarkAsReadResponse {
    success: boolean;
    message: string;
    updatedNotification: Notification;
  }