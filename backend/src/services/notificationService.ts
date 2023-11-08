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
      const socketId = socket.id
      this.userDataUseCase.setSocketConnection(userId, socketId)
    })
    
    return io
  }
}

