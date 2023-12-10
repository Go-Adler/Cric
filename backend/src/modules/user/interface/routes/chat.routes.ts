import express from 'express'

import { JwtMiddleware } from '../middleware/auth.middleware'

const router = express.Router()

const { verifyJwt } = new JwtMiddleware()

router.use(verifyJwt)

router.get('/message', )