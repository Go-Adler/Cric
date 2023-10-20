import { SuccessPost } from "../post.model"

export interface I_UserBasicInfo {
  profilePicture: string,
  name: string,
  userName: string,
  friendsCount: string,
}

export interface postSuccessResponse {
  message: string,
  postContent: SuccessPost
}