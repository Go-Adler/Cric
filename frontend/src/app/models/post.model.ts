export interface Post {
  text: string,
  image: File
}


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

export interface SuccessPost {
  content: Content;
  actions: Actions;
  engagement: Engagement;
  metrics: Metrics;
  additionalInfo: AdditionalInfo;
}