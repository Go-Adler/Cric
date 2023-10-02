import express from 'express'

import { JwtMiddleware } from '../middleware/auth.middleware'
import { GetUserPostsController } from '../controllers/user.getPosts.controller'
import { PostLikeController } from '../controllers/user.likePost.controller'
import { UserNewPostController } from '../controllers/user.newPost.controller'
import { MulterMiddleware } from '../middleware/multer.middleware'
import { CommentController } from '../controllers/user.comment.controller'

const { likeComment, comment, getComments } = new CommentController()
const { likePost, unlikePost } = new PostLikeController()
const { getUserPosts } = new GetUserPostsController()
const { verifyJwt } = new JwtMiddleware()
const { userNewPost } = new UserNewPostController()
const { memoryStorage } = new MulterMiddleware()


const router = express.Router()

router.post('/new-comment', verifyJwt, memoryStorage, comment)
router.post('/comments', verifyJwt, memoryStorage, getComments)
router.post('/like-post', verifyJwt, likePost)
router.post('/unlike-post', verifyJwt, unlikePost)
router.post('/like-comment', verifyJwt, likeComment)
router.post('/unlike-comment', verifyJwt, unlikePost)
router.post('/post', verifyJwt, memoryStorage, userNewPost)
router.post('/', verifyJwt, getUserPosts)

export { router as postRoutes }