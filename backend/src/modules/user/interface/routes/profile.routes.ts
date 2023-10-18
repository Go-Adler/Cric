import express from "express";

import { JwtMiddleware } from "../middleware/auth.middleware"
import { MulterMiddleware } from "../middleware/multer.middleware";
import { UserProfileController } from "../controllers/user.profile.controller"

const { verifyJwt } = new JwtMiddleware()
const { memoryStorageProfile } = new MulterMiddleware()
const { updateProfilePicture } = new UserProfileController()

const router = express.Router()

router.use(verifyJwt)

router.post('/update/profile-picture', memoryStorageProfile, updateProfilePicture)

export { router as profileRoutes }