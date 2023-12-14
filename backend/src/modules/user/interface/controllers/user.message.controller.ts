import { NextFunction, Request, Response } from "express"
import { SendMessageUseCase } from "../../application/useCases/user.sendMessage.useCase"
import { JwtPayload } from "jsonwebtoken"

export class UserMessageController {
  private sendMessageUseCase: SendMessageUseCase

  constructor() {
    this.sendMessageUseCase = new SendMessageUseCase()
  }

  sendMessage = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      const { message, userName }  = req.body
      
      await this.sendMessageUseCase.sendMessage(message, userId, userName)
      res.json({ message: 'Message sent successfully'})
    } catch(error) {
      next(error)
    }
  }
}