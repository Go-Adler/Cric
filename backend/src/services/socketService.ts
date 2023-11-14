import { Server as SocketServer, Socket } from 'socket.io';
import { instrument } from "@socket.io/admin-ui";
import { Server } from 'http'
import { UserDataUseCase } from '../modules/user/application/useCases/user.data.useCase'

export class SocketService {
  userDataUseCase: UserDataUseCase
  io: SocketServer
  constructor(server: Server) {
    this.userDataUseCase = new UserDataUseCase()
    this.io = new SocketServer(server, { 
      cors: {
        origin: ["http://localhost:4200", "https://admin.socket.io", "*"],
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
    this.setUpSocketIo()
  }
  
  setUpSocketIo = () => {
    this.io.on("connection", (socket: Socket) => {
      
      const userName = socket.handshake.query.userName as string
      const socketId = socket.id
      console.log(userName, 26);
      this.userDataUseCase.setSocketConnection(userName, socketId)
      

      socket.on('disconnect-request', () => {
        socket.disconnect()
        console.log('disconned');
      })

      socket.on('disconnect', () => {
        this.userDataUseCase.removeSocketConnection(socketId)
      })
    })
    instrument(this.io, { auth: false })
  }
}