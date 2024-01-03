"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const socketSchema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
    },
    socketId: {
        type: String,
        required: true,
    },
});
exports.SocketEntity = mongoose_1.default.model('Sockets', socketSchema);
