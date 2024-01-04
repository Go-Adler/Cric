"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_message_controller_1 = require("../controllers/user.message.controller");
const router = express_1.default.Router();
exports.chatRoutes = router;
const { verifyJwt } = new auth_middleware_1.JwtMiddleware();
const { sendMessage, getMessages, getMessagesList, markAsRead } = new user_message_controller_1.UserMessageController();
router.use(verifyJwt);
router.get('/get-messages', getMessagesList);
router.post('/mark-as-read', markAsRead);
router.post('/get-messages', getMessages);
router.post('/send-message', sendMessage);
