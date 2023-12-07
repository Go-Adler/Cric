import mongoose from 'mongoose'
import { Socket } from '../../../shared/interfaces/socket.interface' 

const socketSchema = new mongoose.Schema<Socket>({
  userName: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
})

export const SocketEntity = mongoose.model<Socket>('Sockets', socketSchema)