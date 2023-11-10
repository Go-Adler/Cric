import { Types } from 'mongoose'
import { Server, Socket } from 'socket.io';

import serverApp from '../server';
import { UserDataUseCase } from '../modules/user/application/useCases/user.data.useCase';

export class NotificationService {
  userDataUseCase: UserDataUseCase
  constructor(){
    this.userDataUseCase = new UserDataUseCase()
  }
  
  setUpSocketIo = (userId: Types.ObjectId):Server => {
    const io = new Server(serverApp.server, { 
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
      },
    });
  
    io.on("connection", (socket: Socket) => {
      console.log(socket.id, 'connected');
      
      const socketId = socket.id
      this.userDataUseCase.setSocketConnection(userId, socketId)

      socket.on('disconnect', () => {
        console.log('disconned');
        socket.disconnect()
      })
    })
    return io
  }
}

