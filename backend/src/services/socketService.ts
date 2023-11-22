import { Server as SocketServer, Socket } from "socket.io"
import { instrument } from "@socket.io/admin-ui"
import { Server } from "http"
import { UserDataUseCase } from "../modules/user/application/useCases/user.data.useCase"

// Define constants
const CONNECTION_EVENT = "connection"
const DISCONNECT_REQUEST_EVENT = "disconnect-request"
const DISCONNECT_EVENT = "disconnect"
const NOTIFICATION_EVENT = "notification"
const DEFAULT_MESSAGE = "a message"

// Define interface for socket configuration
interface SocketConfig {
  cors: {
    origin: string[]
    methods: string[]
    credentials: boolean
  }
}

// Define class for socket service
export class SocketService {
  // Singleton instance
  private static instance: SocketService

  // User data use case
  private userDataUseCase: UserDataUseCase

  // Socket server
  private io!: SocketServer

  // Private constructor
  private constructor() {
    this.userDataUseCase = new UserDataUseCase()
  }

  // Create a static method to get the instance
  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService()
    }
    return SocketService.instance
  }

  // Set up Socket.IO with server and configuration
  public setUpSocketIo(server: Server): void {
    try {
      // Create socket configuration object
      const socketConfig: SocketConfig = {
        cors: {
          origin: ["http://localhost:4200", "https://admin.socket.io"],
          methods: ["GET", "POST"],
          credentials: true,
        },
      }

      // Create socket server
      this.io = new SocketServer(server, socketConfig)

      // Handle socket connection event
      this.io.on(CONNECTION_EVENT, (socket: Socket) => {
        try {
          // Get user name and socket id from handshake query
          const userName = socket.handshake.query.userName as string
          const socketId = socket.id

          // Set up user data for the connection
          this.userDataUseCase.setSocketConnection(userName, socketId)

          // Handle disconnect-request event
          socket.on(DISCONNECT_REQUEST_EVENT, () => {
            // Disconnect the socket
            socket.disconnect()
          })

          // Handle disconnect event
          socket.on(DISCONNECT_EVENT, () => {
            const socketId = socket.id
            // Remove user data for the connection
            this.userDataUseCase.removeSocketConnection(socketId)
          })
        } catch (e:any) {
          console.error(`Error handling socket connection event: ${e.message}`)
          throw new Error(e.message)
        }
      })

      // Enable admin UI for monitoring
      instrument(this.io, { auth: false })
    } catch (error: any) {
      console.error(`Error setting up Socket.IO: ${error}`)
      throw new Error(error.message)
    }
  }

  // Send a notification to all sockets associated with the user
  public async sendNotification(userId: string): Promise<void> {
    try {
      // Get sockets for the user
      const sockets = await this.userDataUseCase.getSockets(userId)

      // Check if sockets exist
      if (sockets) {
        // Loop through each socket
        sockets.forEach((socket) => {
          this.io.to(socket).emit(NOTIFICATION_EVENT, DEFAULT_MESSAGE);
        });
        
      }
    } catch (error) {
      // Handle error
      this.log(error)
    }
  }

  // Log a message using a logger
  private log(message: any): void {
    // TODO: Use a logger for logging instead of console.log
    console.log(message)
  }
}
