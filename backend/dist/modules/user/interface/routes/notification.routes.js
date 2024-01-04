"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_notification_controller_1 = require("../controllers/user.notification.controller");
const { verifyJwt } = new auth_middleware_1.JwtMiddleware();
const { getNotifications, markAsRead } = new user_notification_controller_1.NotificationController();
const router = express_1.default.Router();
exports.notificationRoutes = router;
router.use(verifyJwt);
router.get('/', getNotifications);
router.patch('/mark-as-read', markAsRead);
