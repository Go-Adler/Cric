import { Post } from "../post.model"

export interface I_UserBasicInfo {
  name: string,
  userName: string,
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
  friendsCount: string,
  profilePicture: string,
  friendStatus: FriendStatus,
  notificationsCount: number,
}