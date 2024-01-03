"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.notificationSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    }
});
