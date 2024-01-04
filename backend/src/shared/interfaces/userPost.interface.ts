import { Document, Types } from "mongoose"

// Define an interface for the content of a post
export interface Content {
  text?: string
  links?: string[]
  hashtags?: string[]
  mentions?: string[]
  multimedia?: string[]
}

interface PersonDetails {
  name: string
  userName: string
  profilePicture: string
}

// Define an interface for the engagement status of a user on a post
export interface Engagement {
  liked?: boolean
  bookmarked?: boolean
  rePosted?: boolean
}

// Define an interface for the actions performed on a post
export interface Actions {
  saved?: number
  likes?: number
  rePosts?: number
  replies?: number
  quotePosts?: number
  bookmarks?: number
}

// Define an interface for the additional information of a post
export interface AdditionalInfo {
  visibility?: "public" | "private" | "friends"
}

// Define an interface for a post document
export interface Post extends Document {
  timestamp?: Date
  content?: Content
  actions?: Actions
  userId?: Types.ObjectId
  engagement?: Engagement
  replies?: Types.ObjectId[]
  personDetails?: PersonDetails
  usersLiked?: Types.ObjectId[]
  usersSaved?: Types.ObjectId[]
  additionalInfo?: AdditionalInfo
}

export interface FeedPost extends Post {
  profilePicture: string
  userName: string
  name: string
}

export interface PostResponse {
  post: Post
  name: string
  userName: string
  profilePicture?: string
}
