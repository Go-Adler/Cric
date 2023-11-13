import mongoose from 'mongoose'

const socketSchema = new mongoose.Schema({
  userName: String,
  socketId: String
})

export const SocketEntity = mongoose.model('Sockets', socketSchema)