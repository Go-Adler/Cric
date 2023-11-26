import express from 'express'
import { JwtMiddleware } from '../middleware/auth.middleware'
import { NotificationController } from '../controllers/user.notification.controller'

const { verifyJwt } = new JwtMiddleware()
const { getNotifications } = new NotificationController()

const router = express.Router()

router.use(verifyJwt)

router.patch('/mark-as-read')

router.get('/', getNotifications)


export { router as notificationRoutes}