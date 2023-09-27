import express from 'express'

import { JwtMiddleware } from '../middleware/auth.middleware'
import { GetUserPostsController } from '../controllers/user.getPosts.controller'
import { PostLikeController } from '../controllers/user.likePost.controller'

const { likePost } = new PostLikeController()
const { getUserPosts } = new GetUserPostsController()
const { verifyJwt } = new JwtMiddleware()

const router = express.Router()

router.post('/like-post', verifyJwt, likePost)
router.post('/', verifyJwt, getUserPosts)

export { router as postRoutes }