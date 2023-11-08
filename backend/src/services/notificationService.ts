import { Server, Socket } from 'socket.io';

import serverApp from '../server';
import { UserDataAccess } from '../modules/user/data/user.dataAccess';

export class NotificationService {
  setUpSocketIo = ():Server => {
    const io = new Server(serverApp.server, { 
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
      },
    });
  
    io.on("connection", (socket) => {
  
    })
    
    return io
  }
}

