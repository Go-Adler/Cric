import { NextFunction, Request, Response } from "express"
import { MessageUseCase } from "../../application/useCases/user.message.useCase"
import { JwtPayload } from "jsonwebtoken"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { SocketService } from "../../../../services/socketService"

export class UserMessageController {
  private messageUseCase: MessageUseCase
  private awsUrlUseCase: GetAwsUrlUseCase
  private socketService: SocketService


  constructor() {
    this.messageUseCase = new MessageUseCase()
    this.awsUrlUseCase = new GetAwsUrlUseCase()
    this.socketService = SocketService.getInstance()
  }

  sendMessage = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      const { message, userName }  = req.body
      
      const personId = await this.messageUseCase.sendMessage(message, userId, userName)
      await this.socketService.sendMessage(personId, message)
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