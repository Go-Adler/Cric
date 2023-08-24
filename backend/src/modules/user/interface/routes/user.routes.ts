import express from 'express';

import { UserSignUpController } from '../controllers/user.signUp.controller';
import { UserSignUpOtpController } from '../controllers/user.signUpOtp.controller';
import { UserLoginController } from '../controllers/user.logIn.controller'

const router = express.Router();

const signUpController = new UserSignUpController();
const userSignUpOtpController = new UserSignUpOtpController()
const userLoginController = new UserLoginController()

router.post('/sign-up', signUpController.userSignUp)
router.post('/sign-up-otp', userSignUpOtpController.verifyOtp)
router.post('/log-in', userLoginController.userLogin)

export { router as userRoutes };