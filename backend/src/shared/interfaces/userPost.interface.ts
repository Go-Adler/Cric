export interface PostContent {
  text: string;
  hashtags: string[];
  mentions: string[];
  links: string[];
  multimedia: string[];
}

export interface PostActions {
  likes: number;
  rePosts: number;
  replies: number;
  quotePosts: number;
}

export interface PostEngagement {
  liked: boolean;
  rePosted: boolean;
}

export interface PostMetrics {
  timestamp: Date;
}

export interface PostAdditionalInfo {
  visibility: string;
}

export interface PostDocumentComplete extends Document {
  content?: PostContent;
  actions?: PostActions;
  engagement?: PostEngagement;
  metrics?: PostMetrics;
  additionalInfo?: PostAdditionalInfo;
}

export interface PostDocument {
  content: {
    text: string;
    hashtags: string[];
    mentions: string[];
    links: string[];
    multimedia: string[];
  };
  metrics: {
    timestamp: Date;
  };
  _id?: string; 
}