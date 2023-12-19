// User data response interface
export interface UserBasicInfoResponse {
  name: string;
  userName: string;
  messageCount: number,
  friendsCount: number;
  profilePicture?: string;
  notificationsCount?: number;
}

export interface UserBasicInfo {
  name: string,
  userName: string,
  friendsCount: number;
  profilePicture?: string;
}