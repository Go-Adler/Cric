import mongoose from "mongoose"

interface IContent {
    text?: string;
    hashtags?: string[];
    mentions?: string[];
    links?: string[];
    multimedia?: string[];
  }
  
  interface IActions {
    likes?: number;
    rePosts?: number;
    replies?: number;
    saved?: number;
    quotePosts?: number;
  }
  
  interface IEngagement {
    liked?: boolean;
    rePosted?: boolean;
  }
  
  interface IAdditionalInfo {
    visibility?: 'public' | 'private' | 'friends';
  }
  
  interface IComment {
    userId?: mongoose.Schema.Types.ObjectId;
    content?: IContent;
    actions?: IActions;
    engagement?: IEngagement;
    timestamp?: Date;
    additionalInfo?: IAdditionalInfo;
    usersLiked?: mongoose.Schema.Types.ObjectId[];
    replies?: mongoose.Schema.Types.ObjectId[];
  }
  
  export type CommentEntity = mongoose.Document & IComment;
  