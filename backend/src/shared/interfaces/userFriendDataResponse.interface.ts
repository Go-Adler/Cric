// User data response interface
export interface UserDataResponse {
  name: string;
  userName: string;
  friendsCount: number;
  profilePicture?: string;
  notificationsCount?: number;
  isFriend?: boolean; 
}