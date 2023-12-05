import { Post } from "../post.model"

export interface I_UserBasicInfo {
  profilePicture: string,
  name: string,
  userName: string,
  friendsCount: string,
  notificationsCount: number,
  isFriend: boolean
}

export interface postSuccessResponse {
  message: string,
  postContent: Post
}