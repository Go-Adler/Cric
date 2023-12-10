import express from "express"

import { postRoutes } from "./post.routes"
import { profileRoutes } from "./profile.routes"
import { friendRoutes } from "./userFriend.routes"
import { notificationRoutes } from "./notification.routes"
import { JwtMiddleware } from "../middleware/auth.middleware"
import { UsersController } from "../controllers/user.users.controller"
import { UserLoginController } from "../controllers/user.logIn.controller"
import { UserDataController } from "../controllers/user.userDataController"
import { UserSignUpController } from "../controllers/user.signUp.controller"
import { UserResendOtpController } from "../controllers/user.resendOtp.controller"
import { UserSignUpOtpController } from "../controllers/user.signUpOtp.controller"
import { UserForgotPasswordController } from "../controllers/user.forgotPassword.controller"
import { UserChangePasswordController } from "../controllers/user.changePassword.controller"
import { UserMessageController } from "../controllers/user.message.controller"

const { findUsers } = new UsersController()
const { userLogin } = new UserLoginController()
const { userSignUp } = new UserSignUpController()
const { verifyOtp } = new UserSignUpOtpController()
const { resendOtp } = new UserResendOtpController()
const { forgotPassword } = new UserForgotPasswordController()
const { changePassword } = new UserChangePasswordController()
const { userBasicInfo } = new UserDataController()
const { verifyJwt, verifyToken, verifyVerifyToken } = new JwtMiddleware()

const router = express.Router()

router.use("/posts", postRoutes)
router.use("/profile", profileRoutes)
router.use("/friend", friendRoutes)
router.use("/notifications", notificationRoutes)
router.use()

router.get("/basic-info", verifyJwt, userBasicInfo)
router.get("/resend-otp", verifyVerifyToken, resendOtp)

router.post("/log-in", userLogin)
router.post("/sign-up", userSignUp)
router.post("/verify-token", verifyToken)
router.post("/find", verifyJwt, findUsers)
router.post("/forgot-password", forgotPassword)
router.post("/forgot-password-otp", verifyVerifyToken)
router.post("/verification", verifyVerifyToken, verifyOtp)
router.post("/changePassword", verifyVerifyToken, changePassword)

export { router as userRoutes }
