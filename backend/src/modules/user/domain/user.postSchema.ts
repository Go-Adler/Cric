import mongoose from 'mongoose'
import { type } from 'os'

// Define a schema for the content of a post
const contentSchema = new mongoose.Schema({
  text: String,
  hashtags: [String],
  mentions: [String],
  links: [String],
  multimedia: [String],
}, { _id: false })

// Define a schema for the actions performed on a post
const actionsSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  rePosts: { type: Number, default: 0 },
  replies: { type: Number, default: 0 },
  saved: { type: Number, default: 0 },
  quotePosts: { type: Number, default: 0 },
}, { _id: false })

// Define a schema for the engagement status of a user on a post
const engagementSchema = new mongoose.Schema({
  liked: {
    type: Boolean,
    default: false
  },
  rePosted: {
    type: Boolean,
    default: false
  }
}, { _id: false })

// Define a schema for the additional information of a post
const additionalInfoSchema = new mongoose.Schema({
  visibility: {
    type: String,
    default: 'friends',
    enum: ['public', 'private', 'friends'],
  },
}, { _id: false })

// Define a schema for a post
export const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  content: contentSchema,
  actions: {
    type: actionsSchema,
    default: {}
  },
  engagement: {
    type: engagementSchema,
    default: {}
  },
  timestamp: { type: Date, default: Date.now, index: true },
  additionalInfo: additionalInfoSchema,
  usersLiked: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Users',
    default: [],
  }
})

// Create a model for the Posts collection
export const PostEntity = mongoose.model('Posts', postSchema)