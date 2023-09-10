import { Request, Response, NextFunction } from 'express'

import { UserPostDataAccess } from '../../data/user.postDataAccess'
import { JwtPayload } from 'jsonwebtoken'

export class UserDataController {
  private userPostDataAccess: UserPostDataAccess

  constructor() {
    this.userPostDataAccess = new UserPostDataAccess()
  }

  userNewPost = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.user as JwtPayload
    const text = req.body

    try {
      const timestamp = new Date()
      const postData = { content: text, metrics: {timestamp} }

      const posts = this.userPostDataAccess.getUserPosts(email)

      res.json({ message: 'Post created successfully', posts })
    } catch (error) {
      return next(error)
    }
  }
}