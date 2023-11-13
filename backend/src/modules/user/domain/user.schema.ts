import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number
  },
  postIds: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  savedPosts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  friends: {
    type: [mongoose.Schema.Types.ObjectId],
    default: []
  },
  socketId: {
    type: [String],
    default: ''
  }
});


export const UserEntity = mongoose.model('Users', userSchema);