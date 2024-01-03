"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEntity = exports.postSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define a schema for the content of a post
const contentSchema = new mongoose_1.default.Schema({
    text: String,
    hashtags: [String],
    mentions: [String],
    links: [String],
    multimedia: [String],
}, { _id: false });
// Define a schema for the actions performed on a post
const actionsSchema = new mongoose_1.default.Schema({
    likes: { type: Number, default: 0 },
    rePosts: { type: Number, default: 0 },
    replies: { type: Number, default: 0 },
    saved: { type: Number, default: 0 },
    quotePosts: { type: Number, default: 0 },
}, { _id: false });
// Define a schema for the engagement status of a user on a post
const engagementSchema = new mongoose_1.default.Schema({
    liked: {
        type: Boolean,
        default: false
    },
    rePosted: {
        type: Boolean,
        default: false
    }
}, { _id: false });
// Define a schema for the additional information of a post
const additionalInfoSchema = new mongoose_1.default.Schema({
    visibility: {
        type: String,
        default: 'friends',
        enum: ['public', 'private', 'friends'],
    },
}, { _id: false });
// Define a schema for a post
exports.postSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: 'Users',
        default: [],
    },
    replies: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
        default: []
    }
});
// Create a model for the Posts collection
exports.PostEntity = mongoose_1.default.model('Posts', exports.postSchema);
