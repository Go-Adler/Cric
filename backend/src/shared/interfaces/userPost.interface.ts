import { Types } from "mongoose"

export interface Post {
  _id?: Types.ObjectId;
  userId?: Types.ObjectId;
  content?: {
    text?: string;
    hashtags?: string[];
    mentions?: string[];
    links?: string[];
    multimedia?: string[];
  };
  actions?: {
    likes?: number;
    rePosts?: number;
    replies?: number;
    saved?: number;
    quotePosts?: number;
  };
  engagement?: {
    liked?: boolean;
    rePosted?: boolean;
  };
  timestamp?: Date;
  additionalInfo?: {
    visibility?: 'public' | 'private' | 'friends';
  };
  usersLiked?: Types.ObjectId[];
}

export interface UsersFind {
  _id: string,
  profilePicture: string,
  userName: string,
  name: string
}