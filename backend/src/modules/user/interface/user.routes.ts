import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();
const userController = new UserController();

router.get('', () => console.log(7777777))
router.get('login', userController.login);

export { router as userRoutes };
