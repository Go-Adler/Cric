"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_notificationSchema_1 = require("./user.notificationSchema");
const user_chat_schema_1 = require("./user.chat.schema");
const userSchema = new mongoose_1.default.Schema({
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
        default: []
    },
    savedPosts: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        default: []
    },
    friends: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        default: []
    },
    friendRequestsReceived: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        default: []
    },
    friendRequestsSent: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        default: []
    },
    socketId: {
        type: [String],
        default: []
    },
    notifications: {
        type: [user_notificationSchema_1.notificationSchema],
        default: []
    },
    chats: {
        type: [user_chat_schema_1.chatSchema],
        default: []
    }
});
exports.UserEntity = mongoose_1.default.model('Users', userSchema);
