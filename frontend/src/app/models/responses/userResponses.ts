
import { Post } from "../post.model"
export interface I_UserBasicInfo {
  name: string,
  phone: number,
  email: string,
  userName: string,
  messageCount: number,
  friendsCount: string,
  profilePicture: string,
  notificationsCount: number,
}

export interface postSuccessResponse {
  message: string,
  postContent: Post
}

export type FriendStatus = 'friend' | 'stranger' | 'requestReceived' | 'requestSent'

export interface FriendBasicInfo {
  name: string,
  userName: string,
  personId: string,
  isOnline: boolean,
  friendsCount: number,
  profilePicture: string,
  friendStatus: FriendStatus,
  notificationsCount: number,
}