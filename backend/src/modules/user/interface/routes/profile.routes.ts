import express from "express";

import { JwtMiddleware } from "../middleware/auth.middleware"

const { verifyJwt } = new JwtMiddleware()


const router = express.Router()

router.use(verifyJwt)

router.post('/update/profile-picture', () => console.log(12))

export { router as profileRoutes }