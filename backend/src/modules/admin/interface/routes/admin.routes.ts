import express from 'express'

import { AdminLoginController } from '../controllers/admin.logIn.controller'

const router = express.Router()

const { adminLogin } = new AdminLoginController()

router.post('/log-in', adminLogin)

export { router as adminRoutes }