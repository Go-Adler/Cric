import express from 'express'
import { JwtMiddleware } from '../middleware/auth.middleware'
import { NotificationController } from '../controllers/user.notification.controller'

const { verifyJwt } = new JwtMiddleware()
const { getNotifications, markAsRead } = new NotificationController()

const router = express.Router()

router.use(verifyJwt)

router.get('/', getNotifications)
router.patch('/mark-as-read', markAsRead)

export { router as notificationRoutes}