import express from 'express'

import { GetUserPostsController } from '../controllers/user.getPosts.controller'
import { UserNewPostController } from '../controllers/user.newPost.controller'
import { PostLikeController } from '../controllers/user.likePost.controller'
import { CommentController } from '../controllers/user.comment.controller'
import { MulterMiddleware } from '../middleware/multer.middleware'
import { JwtMiddleware } from '../middleware/auth.middleware'

const { getUserPosts, getFriendsPosts, getPost, getFeedPosts } = new GetUserPostsController()
const { likeComment, comment, getComments } = new CommentController()
const { likePost, unlikePost } = new PostLikeController()
const { userNewPost } = new UserNewPostController()
const { memoryStorage } = new MulterMiddleware()
const { verifyJwt } = new JwtMiddleware()

const router = express.Router()

router.use(verifyJwt)

router.post('/', getUserPosts)
router.post('/feed', getFeedPosts)
router.post('/like-post', likePost)
router.post('/unlike-post', unlikePost)
router.post('/like-comment', likeComment)
router.post('/unlike-comment', unlikePost)
router.post('/friends-posts', getFriendsPosts)
router.post('/post', memoryStorage, userNewPost)
router.post('/new-comment', memoryStorage, comment)
router.post('/comments', memoryStorage, getComments)

router.get('/:id', getPost)

export { router as postRoutes } 