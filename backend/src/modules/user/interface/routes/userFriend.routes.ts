import express from 'express'
import { JwtMiddleware } from '../middleware/auth.middleware'
import { FriendController } from '../controllers/user.friend.controller'
import { UserDataController } from '../controllers/user.userDataController'

const router = express.Router()

const { verifyJwt } = new JwtMiddleware()
const { friendBasicInfo } = new UserDataController()
const { addFriend, acceptFriend, rejectFriend, removeFriend } = new FriendController()

router.use(verifyJwt)

router.get("/list", addFriend)
router.get("/basic-info/:userName", friendBasicInfo)

router.post("/add-friend", addFriend)
router.post("/accept-friend", acceptFriend)
router.post("/reject-friend", rejectFriend)
router.post("/remove-friend", removeFriend)

export { router as friendRoutes}