import express from 'express';

import { UserSignUpController } from '../controllers/user.signUp.controller';
import { UserSignUpOtpController } from '../controllers/user.signUpOtp.controller';
import { UserLoginController } from '../controllers/user.logIn.controller'
import { JwtMiddleware } from '../middleware/auth.middleware'

const router = express.Router();

const signUpController = new UserSignUpController();
const userSignUpOtpController = new UserSignUpOtpController()
const userLoginController = new UserLoginController()
const jwtMiddleware = new JwtMiddleware()

router.get('/test', jwtMiddleware.verifyJwt, userLoginController.userLogin)
 
router.post('/sign-up', signUpController.userSignUp)
router.post('/sign-up-otp', userSignUpOtpController.verifyOtp)
router.post('/log-in', userLoginController.userLogin)
router.post('/post', jwtMiddleware.verifyJwt, )


export { router as userRoutes };