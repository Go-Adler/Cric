import { NextFunction, Request, Response } from "express"
import { MessageUseCase } from "../../application/useCases/user.message.useCase"
import { JwtPayload } from "jsonwebtoken"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"

export class UserMessageController {
  private messageUseCase: MessageUseCase
  private awsUrlUseCase: GetAwsUrlUseCase

  constructor() {
    this.messageUseCase = new MessageUseCase()
    this.awsUrlUseCase = new GetAwsUrlUseCase()
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
      
      let messages = await this.messageUseCase.getMessagesList(userId)
      messages = await this.awsUrlUseCase.getMessageWithUrl(messages)
      
      res.json({ messages })
    } catch (error) {
      next(error)
    }
  }
}