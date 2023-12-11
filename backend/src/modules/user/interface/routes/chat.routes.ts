import express from 'express'

import { JwtMiddleware } from '../middleware/auth.middleware'
import { UserMessageController } from '../controllers/user.message.controller'

const router = express.Router()

const { verifyJwt } = new JwtMiddleware()
const { sendMessage } = new UserMessageController()

router.use(verifyJwt)

router.post('/send-message', sendMessage)

export { router as chatRoutes }