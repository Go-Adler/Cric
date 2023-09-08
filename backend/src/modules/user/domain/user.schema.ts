import mongoose from 'mongoose';
import { postSchema } from './user.postSchema';

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
  otp: {
    type: Number
  },
  posts: {
    type: [postSchema],
    default: []
  }
});

export const UserEntity = mongoose.model('Users', userSchema);