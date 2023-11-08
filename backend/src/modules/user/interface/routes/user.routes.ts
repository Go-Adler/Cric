import express from "express"
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from "jsonwebtoken"
import { Socket } from "socket.io"

import { UserSignUpController } from "../controllers/user.signUp.controller"
import { UserSignUpOtpController } from "../controllers/user.signUpOtp.controller"
import { UserLoginController } from "../controllers/user.logIn.controller"
import { JwtMiddleware } from "../middleware/auth.middleware"
import { UserForgotPasswordController } from "../controllers/user.forgotPassword.controller"
import { UserChangePasswordController } from "../controllers/user.changePassword.controller"
import { UserDataController } from "../controllers/user.userDataController"
import { UserResendOtpController } from "../controllers/user.resendOtp.controller"
import { postRoutes } from "./post.routes"
import { profileRoutes } from "./profile.routes"
import { UsersController } from "../controllers/user.users.controller"
import { NotificationService } from "../../../../services/notificationService"
import { UserDataUseCase } from "../../application/useCases/user.data.useCase"

const { verifyJwt, verifyToken, verifyVerifyToken } = new JwtMiddleware()
const { findUsers } = new UsersController()
const { resendOtp } = new UserResendOtpController()
const { userSignUp } = new UserSignUpController()
const { verifyOtp } = new UserSignUpOtpController()
const { userLogin } = new UserLoginController()
const { forgotPassword } = new UserForgotPasswordController()
const { changePassword } = new UserChangePasswordController()
const { userBasicInfo, friendBasicInfo } = new UserDataController()
const { setUpSocketIo } = new NotificationService()
const { setSocketConnection } = new UserDataUseCase()

const router = express.Router()

router.use("/posts", postRoutes)
router.use("/profile", profileRoutes)

router.get("/basic-info", verifyJwt, userBasicInfo)
router.get("/friend/basic-info/:userName", verifyJwt, friendBasicInfo)
router.get("/resend-otp", verifyVerifyToken, resendOtp)
router.get('/socket', verifyJwt, (req: Request, res) => {
  const { userId } = req.user as JwtPayload
  const io = setUpSocketIo(userId)
  io.on("connection", async(socket: Socket) => {
    console.log(`Socket connected: ${socket.id}`);
    const socketId = socket.id
      await setSocketConnection(userId, socketId)
      socket.on('like-post', data => {
      console.log('like post recieved');
      io.emit('notification', {
        type: 'like'
      })
    })
  })
  res.json({success: true})
})

router.post("/log-in", userLogin)
router.post("/sign-up", userSignUp)
router.post("/find", verifyJwt, findUsers)
router.post("/verification", verifyVerifyToken, verifyOtp)
router.post("/forgot-password", forgotPassword)
router.post("/forgot-password-otp", verifyVerifyToken)
router.post("/changePassword", verifyVerifyToken, changePassword)
router.post("/verify-token", verifyToken)

export { router as userRoutes }
