import express from 'express'
import { JwtMiddleware } from '../middleware/auth.middleware'
import { FriendController } from '../controllers/user.friend.controller'
import { UserDataController } from '../controllers/user.userDataController'

const router = express.Router()

const { verifyJwt } = new JwtMiddleware()
const { friendBasicInfo } = new UserDataController()
const { addFriend, acceptFriend, rejectFriend} = new FriendController()

router.use(verifyJwt)

router.get("/basic-info/:userName", verifyJwt, friendBasicInfo)

router.post("/add-friend", verifyJwt, addFriend)
router.post("/accept-friend", verifyJwt, acceptFriend)
router.post("/reject-friend", verifyJwt, rejectFriend)

export { router as friendRoutes}