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

const { userSignUp } = new UserSignUpController()
const { verifyOtp } = new UserSignUpOtpController()
const { userLogin } = new UserLoginController()
const { verifyJwt, verifyJwtForOtp, verifyToken } = new JwtMiddleware()
const { userNewPost } = new UserNewPostController()
const { getUserPosts } = new GetUserPostsController()
const { forgotPassword } = new UserForgotPasswordController()
const { changePassword } = new UserChangePasswordController()

const router = express.Router()

router.get('/test', verifyJwt, userLogin)
router.get('/posts', verifyJwt, getUserPosts)

router.post('/sign-up', userSignUp)
router.post('/verify-token', verifyToken)
router.post('/sign-up-otp', verifyJwtForOtp, verifyOtp)
router.post('/log-in', userLogin)
router.post('/post', verifyJwt, userNewPost)
router.post('/profile-picture', verifyJwt, userNewPost)
router.post('/forgot-password',  forgotPassword)
router.post('/changePassword', verifyJwtForOtp, changePassword)


export { router as userRoutes }