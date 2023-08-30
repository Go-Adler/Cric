import express from 'express'

import { UserSignUpController } from '../controllers/user.signUp.controller'
import { UserSignUpOtpController } from '../controllers/user.signUpOtp.controller'
import { UserLoginController } from '../controllers/user.logIn.controller'
import { UserNewPostController } from '../controllers/user.newPost.controller'
import { GetUserPostsController } from '../controllers/user.getPosts.controller'
import { JwtMiddleware } from '../middleware/auth.middleware'

const { userSignUp } = new UserSignUpController()
const { verifyOtp } = new UserSignUpOtpController()
const { userLogin } = new UserLoginController()
const { verifyJwt } = new JwtMiddleware()
const { userNewPost } = new UserNewPostController()
const { getUserPosts } = new GetUserPostsController()

const router = express.Router()

router.get('/test', verifyJwt, userLogin)
router.get('/posts', verifyJwt, getUserPosts)

router.post('/sign-up', userSignUp)
router.post('/sign-up-otp', verifyOtp)
router.post('/log-in', userLogin)
router.post('/post', verifyJwt, userNewPost)

export { router as userRoutes }
