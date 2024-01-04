import express from "express";

import { JwtMiddleware } from "../middleware/auth.middleware"
import { MulterMiddleware } from "../middleware/multer.middleware";
import { UserProfileController } from "../controllers/user.profile.controller"

const { verifyJwt } = new JwtMiddleware()
const { memoryStorageProfile } = new MulterMiddleware()
const { updateProfilePicture, updateUserInfo } = new UserProfileController()

const router = express.Router()

router.use(verifyJwt)

router.post('/update/profile-picture', memoryStorageProfile, updateProfilePicture)
router.post('/update/user-info', updateUserInfo)

export { router as profileRoutes }