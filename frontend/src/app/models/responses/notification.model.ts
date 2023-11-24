export interface Notification {
  notifications: Array<{
    type: string;
    userName: string;
    read: boolean;
    timeStamp: Date;
    postId: string;
  }>
}
