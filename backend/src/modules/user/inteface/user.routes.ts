import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
const userController = new UserController();

router.get('/login', userController.login);

export { router as userRoutes };
