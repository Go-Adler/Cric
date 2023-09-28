import express from 'express'

import { JwtMiddleware } from '../middleware/auth.middleware'
import { GetUserPostsController } from '../controllers/user.getPosts.controller'
import { PostLikeController } from '../controllers/user.likePost.controller'
import { UserNewPostController } from '../controllers/user.newPost.controller'
import { MulterMiddleware } from '../middleware/multer.middleware'


const { likePost } = new PostLikeController()
const { getUserPosts } = new GetUserPostsController()
const { verifyJwt } = new JwtMiddleware()
const { userNewPost } = new UserNewPostController()
const { memoryStorage } = new MulterMiddleware()


const router = express.Router()

router.post('/like-post', verifyJwt, likePost)
router.post('/post', verifyJwt, memoryStorage, userNewPost)
router.post('/', verifyJwt, getUserPosts)

export { router as postRoutes }