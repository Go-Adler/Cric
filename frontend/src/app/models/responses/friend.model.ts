import { FriendStatus } from "./userResponses"

export interface AddFriendResponse {
    message: 'string',
    friendStatus: FriendStatus
}