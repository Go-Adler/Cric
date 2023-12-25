import express from 'express'

import { JwtMiddleware } from '../middleware/auth.middleware'
import { UserMessageController } from '../controllers/user.message.controller'

const router = express.Router()

const { verifyJwt } = new JwtMiddleware()
const { sendMessage, getMessages, getMessagesList, markAsRead } = new UserMessageController()

router.use(verifyJwt)

router.get('/get-messages', getMessagesList)

router.post('/mark-as-read', markAsRead)
router.post('/get-messages', getMessages)
router.post('/send-message', sendMessage)

export { router as chatRoutes }