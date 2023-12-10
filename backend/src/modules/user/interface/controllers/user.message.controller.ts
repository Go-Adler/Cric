import { NextFunction, Request, Response } from "express"

export class UserMessageController {
  constructor() {}

  sendMessage = async(req: Request, res: Response, next: NextFunction) => {
    console.log(req.body, 7)
  }
}