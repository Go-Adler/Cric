import express from 'express'

import { UserSignUpController } from '../controllers/user.signUp.controller'
import { UserSignUpOtpController } from '../controllers/user.signUpOtp.controller'
import { UserLoginController } from '../controllers/user.logIn.controller'
import { UserNewPostController } from '../controllers/user.newPost.controller'
import { GetUserPostsController } from '../controllers/user.getPosts.controller'
import { JwtMiddleware } from '../middleware/auth.middleware'
import { UserForgotPasswordController } from '../controllers/user.forgotPassword.controller'
import { UserChangePasswordController } from '../controllers/user.changePassword.controller'
import { UserDataController } from '../controllers/user.userDataController'
import { UserResendOtpController } from '../controllers/user.resendOtp.controller'
import { MulterMiddleware } from '../middleware/multer.middleware'

const { verifyJwt, verifyToken, verifyVerifyToken } = new JwtMiddleware()
const { memoryStorage } = new MulterMiddleware()
const { resendOtp } = new UserResendOtpController()
const { userSignUp } = new UserSignUpController()
const { verifyOtp } = new UserSignUpOtpController()
const { userLogin } = new UserLoginController()
const { userNewPost } = new UserNewPostController()
const { getUserPosts } = new GetUserPostsController()
const { forgotPassword } = new UserForgotPasswordController()
const { changePassword } = new UserChangePasswordController()
const { userBasicInfo } = new UserDataController()

const router = express.Router()

router.get('/basic-info', verifyJwt, userBasicInfo)
router.get('/resend-otp', verifyVerifyToken, resendOtp)

router.post('/posts', verifyJwt, getUserPosts)
router.post('/log-in', userLogin)
router.post('/sign-up', userSignUp)
router.post('/post', verifyJwt, memoryStorage, userNewPost)
router.post('/upload')
router.post('/verification', verifyVerifyToken, verifyOtp)
router.post('/forgot-password', forgotPassword)
router.post('/forgot-password-otp', verifyVerifyToken)
router.post('/changePassword', verifyVerifyToken, changePassword)
router.post('/verify-token', verifyToken)

export { router as userRoutes }