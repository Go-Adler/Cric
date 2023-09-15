import express from 'express'

import { AdminLoginController } from '../controllers/admin.logIn.controller'
import { GetUsersController } from '../controllers/admin.getUsers.controller'

const router = express.Router()

const { adminLogin } = new AdminLoginController()
const { getUsers, blockUser, unblockUser } = new GetUsersController()
router.post('/log-in', adminLogin)
router.post('/block-user', blockUser)
router.post('/unblock-user', unblockUser)


router.get('/users', getUsers)



export { router as adminRoutes }