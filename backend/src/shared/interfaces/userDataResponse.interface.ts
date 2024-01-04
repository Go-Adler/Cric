// User data response interface
export interface UserBasicInfoResponse {
  name: string;
  email: string;
  userName: string;
  phone: string,
  messageCount: number,
  friendsCount: number;
  profilePicture?: string;
  notificationsCount?: number;
}

export interface UserBasicInfo {
  name: string,
  email: string
  phone: string,
  userName: string,
  friendsCount: number;
  profilePicture?: string;
}