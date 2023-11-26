import { Document, Types } from 'mongoose';

// Define an interface for the content of a post
export interface Content {
  text: string;
  hashtags: string[];
  mentions: string[];
  links: string[];
  multimedia: string[];
}

// Define an interface for the actions performed on a post
export interface Actions {
  likes: number;
  rePosts: number;
  replies: number;
  saved: number;
  quotePosts: number;
}

// Define an interface for the engagement status of a user on a post
export interface Engagement {
  liked: boolean;
  rePosted: boolean;
}

// Define an interface for the additional information of a post
export interface AdditionalInfo {
  visibility: 'public' | 'private' | 'friends';
}

// Define an interface for a post document
export interface Post extends Document {
  userId: Types.ObjectId;
  content: Content;
  actions: Actions;
  engagement: Engagement;
  timestamp: Date;
  additionalInfo: AdditionalInfo;
  usersLiked: Types.ObjectId[];
  replies: Types.ObjectId[];
}

export interface PostResponse {
  post: Post,
  profilePicture?: string,
  name: string,
  userName: string
}