"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_logIn_controller_1 = require("../controllers/admin.logIn.controller");
const admin_getUsers_controller_1 = require("../controllers/admin.getUsers.controller");
const router = express_1.default.Router();
exports.adminRoutes = router;
const { adminLogin } = new admin_logIn_controller_1.AdminLoginController();
const { getUsers, blockUser, unblockUser } = new admin_getUsers_controller_1.GetUsersController();
router.post('/log-in', adminLogin);
router.post('/block-user', blockUser);
router.post('/unblock-user', unblockUser);
router.get('/users', getUsers);
