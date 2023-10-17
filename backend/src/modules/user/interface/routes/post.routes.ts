import express from 'express'

import { GetUserPostsController } from '../controllers/user.getPosts.controller'
import { PostLikeController } from '../controllers/user.likePost.controller'
import { UserNewPostController } from '../controllers/user.newPost.controller'
import { MulterMiddleware } from '../middleware/multer.middleware'
import { CommentController } from '../controllers/user.comment.controller'
import { JwtMiddleware } from '../middleware/auth.middleware'

const { likeComment, comment, getComments } = new CommentController()
const { verifyJwt } = new JwtMiddleware()
const { likePost, unlikePost } = new PostLikeController()
const { getUserPosts } = new GetUserPostsController()
const { userNewPost } = new UserNewPostController()
const { memoryStorage } = new MulterMiddleware()

const router = express.Router()

router.use(verifyJwt)

router.post('/new-comment', memoryStorage, comment)
router.post('/comments', memoryStorage, getComments)
router.post('/like-post', likePost)
router.post('/unlike-post', unlikePost)
router.post('/like-comment', likeComment)
router.post('/unlike-comment', unlikePost)
router.post('/post', memoryStorage, userNewPost)
router.post('/', getUserPosts)

export { router as postRoutes } 