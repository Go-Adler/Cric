  export interface Notification {
    type: string
    userName: string
    read: boolean
    timeStamp: Date
    postId: string
    profilePicture: string,
    userId: string
  }

  export interface NotificationResponse {
    notifications: Notification[];
  }