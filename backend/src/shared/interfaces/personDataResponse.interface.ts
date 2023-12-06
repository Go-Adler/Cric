import { Types } from 'mongoose'

// User data response interface
export interface PersonDataResponse {
  name: string;
  isFriend: boolean; 
  friendsCount: number;
  profilePicture: string;
  personId: Types.ObjectId
}