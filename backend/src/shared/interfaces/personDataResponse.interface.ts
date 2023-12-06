import { Types } from 'mongoose'

export type FriendStatus = 'friend' | 'stranger' | 'requestReceived' | 'requestSent'


// User data response interface
export interface PersonDataResponse {
  name: string;
  friendsCount: number;
  profilePicture: string;
  personId: Types.ObjectId
  friendStatus: FriendStatus; 
}