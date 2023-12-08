// User data response interface
export interface UserBasicInfoResponse {
  name: string;
  userName: string;
  friendsCount: number;
  profilePicture?: string;
  notificationsCount?: number;
}