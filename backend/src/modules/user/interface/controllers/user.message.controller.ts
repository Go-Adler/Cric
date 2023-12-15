import { NextFunction, Request, Response } from "express"
import { MessageUseCase } from "../../application/useCases/user.message.useCase"
import { JwtPayload } from "jsonwebtoken"

export class UserMessageController {
  private messageUseCase: MessageUseCase

  constructor() {
    this.messageUseCase = new MessageUseCase()
  }

  sendMessage = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      const { message, userName }  = req.body
      
      await this.messageUseCase.sendMessage(message, userId, userName)
      res.json({ message: 'Message sent successfully'})
    } catch(error) {
      next(error)
    }
  }

  getMessages = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      const { userName } = req.body

      const messages = await this.messageUseCase.getMessages(userId, userName)
      res.json({ messages })
    } catch (error) {
      next(error)
    }
  }

  getMessagesList = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      console.log(39);
      
      const messages = await this.messageUseCase.getMessagesList(userId)
      res.json({ messages })
    } catch (error) {
      next(error)
    }
  }
}