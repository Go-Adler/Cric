import mongoose from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { postSchema } from './user.postSchema';
import { I_User } from '../../../shared/interfaces/user.interface'

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
  posts: {
    type: [postSchema],
    default: []
  }
});

userSchema.plugin(paginate);


export const UserEntity = mongoose.model<I_User, mongoose.PaginateModel<I_User>>('Users', userSchema);