import { Document } from 'mongoose';

interface Content {
  text?: string;
  hashtags: string[];
  mentions: string[];
  links: string[];
  multimedia: string[];
}

interface Actions {
  likes: number;
  rePosts: number;
  replies: number;
  quotePosts: number;
}

interface Engagement {
  liked: boolean;
  rePosted: boolean;
}

interface Metrics {
  timestamp: Date;
}

interface AdditionalInfo {
  visibility: string;
}

export interface Post extends Document {
  content: Content;
  actions: Actions;
  engagement: Engagement;
  metrics: Metrics;
  additionalInfo: AdditionalInfo;
}