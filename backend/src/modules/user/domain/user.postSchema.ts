const tweetSchema = {
  user: {
    profilePicture: String,
    displayName: String,
    username: String,
  },
  content: {
    text: String,
    hashtags: [String],
    mentions: [String],
    links: [String],
    multimedia: [String], // URLs to images, videos, etc.
  },
  actions: {
    likes: Number,
    retweets: Number,
    replies: Number,
    quoteTweets: Number,
  },
  engagement: {
    liked: Boolean,
    retweeted: Boolean,
  },
  metrics: {
    timestamp: Date,
  },
  additionalInfo: {
    source: String,
    visibility: String,
  },
};
