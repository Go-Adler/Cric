import express from 'express';
import { SignUpController } from './user.controller';

const router = express.Router();
const signUpController = new SignUpController();

router.post('/sign-up', signUpController.login)

router.get('/login', signUpController.login);

export { router as userRoutes };