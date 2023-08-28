import mongoose from 'mongoose'

export const postSchema = new mongoose.Schema({
  content: {
    text: String,
    hashtags: [String],
    mentions: [String],
    links: [String],
    multimedia: [String],
  },
  actions: {
    likes: Number,
    rePosts: Number,
    replies: Number,
    quotePosts: Number,
  },
  engagement: {
    liked: Boolean,
    rePosted: Boolean,
  },
  metrics: {
    timestamp: Date,
  },
  additionalInfo: {
    visibility: String,
  },
})