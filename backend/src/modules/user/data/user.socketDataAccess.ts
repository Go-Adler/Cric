import { Types } from 'mongoose'
import { SocketEntity } from '../domain/user.socketSchema'

export class SocketDataAccess {
  async SocketAdd(userName: string, socketId: string) {
    try {
      await SocketEntity.create({userName, socketId})
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  async GetUserNameWithSocketId(socketId: string) {
    try {
      const socket = await SocketEntity.findOne({ socketId })
      return socket?.userName as string
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }

  async removeSocketId(socketId: string) {
    try {
      const socket = await SocketEntity.findOneAndRemove({ socketId })
      return socket?.userName as string
    } catch (e: any) {
      console.error(e.message)
      throw new Error(e.message)
    }
  }
}