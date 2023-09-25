import mongoose from 'mongoose'

const contentSchema = new mongoose.Schema({
  text: String,
  hashtags: [String],
  mentions: [String],
  links: [String],
  multimedia: [String],
})

const actionsSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  rePosts: { type: Number, default: 0 },
  replies: { type: Number, default: 0 },
  saved: { type: Number, default: 0 },
  quotePosts: { type: Number, default: 0 },
})

const additionalInfoSchema = new mongoose.Schema({
  visibility: {
    type: String,
    default: 'friends',
    enum: ['public', 'private', 'friends'],
  },
})

export const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  content: contentSchema,
  actions: actionsSchema,
  engagement: {
    liked: Boolean,
    rePosted: Boolean,
  },
  timestamp: { type: Date, default: Date.now, index: true },
  additionalInfo: additionalInfoSchema,
})

export const PostEntity = mongoose.model('Post', postSchema)
