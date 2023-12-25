import { NextFunction, Request, Response } from "express"
import { MessageUseCase } from "../../application/useCases/user.message.useCase"
import { JwtPayload } from "jsonwebtoken"
import { GetAwsUrlUseCase } from "../../application/useCases/user.getAwsUrl.useCase"
import { SocketService } from "../../../../services/socketService"
import { GetUserDataUseCase } from "../../application/useCases/user.getData.useCase"

export class UserMessageController {
  private socketService: SocketService
  private messageUseCase: MessageUseCase
  private awsUrlUseCase: GetAwsUrlUseCase
  private getUserDataUseCase: GetUserDataUseCase


  constructor() {
    this.messageUseCase = new MessageUseCase()
    this.awsUrlUseCase = new GetAwsUrlUseCase()
    this.socketService = SocketService.getInstance()
    this.getUserDataUseCase = new GetUserDataUseCase()
  }

  sendMessage = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      const { message, userName }  = req.body
      
      const personId = await this.messageUseCase.sendMessage(message, userId, userName)
      const userNameReceiver = await this.getUserDataUseCase.getUserName(userId)
      await this.socketService.sendMessage(personId, message, userNameReceiver)
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

  markAsRead = async(req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as JwtPayload
      const { userName } = req.body
      
      await this.messageUseCase.markAsRead(userId, userName)

      
      res.json({ message: 'Mark as read success.' })
    } catch (error) {
      next(error)
    }
  }
}