"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_middleware_1 = require("../middleware/multer.middleware");
const user_profile_controller_1 = require("../controllers/user.profile.controller");
const { verifyJwt } = new auth_middleware_1.JwtMiddleware();
const { memoryStorageProfile } = new multer_middleware_1.MulterMiddleware();
const { updateProfilePicture } = new user_profile_controller_1.UserProfileController();
const router = express_1.default.Router();
exports.profileRoutes = router;
router.use(verifyJwt);
router.post('/update/profile-picture', memoryStorageProfile, updateProfilePicture);
