"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
const mongo = async () => {
    try {
        const mongoURL = process.env.MONGO_URL;
        await mongoose_1.default.connect(mongoURL);
        console.log("Connected to mongo");
    }
    catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};
exports.mongo = mongo;
