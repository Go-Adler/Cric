import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import http from "http"
import { Server } from 'socket.io'
import rateLimit from "express-rate-limit";

import { userRoutes } from "./modules/user/interface/routes/user.routes"
import { adminRoutes } from "./modules/admin/interface/routes/admin.routes"
import { mongo } from "./config/database"

export class ServerApp {
  private app: Application
  private server: http.Server
  private io: Server
  private port!: string

  constructor(app: Application) {
    this.port = process.env.PORT!
    this.app = app
    this.server = http.createServer(this.app)
    this.io = new Server(this.server, {
      cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"],
      },
    })
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
    this.socketIoSetup()
    mongo()
  }

  private initializeMiddlewares() {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100, 
    });
    this.app.use(cors())
    this.app.use(morgan("dev"))
    this.app.use(express.json())
    this.app.use(limiter)
  }

  private initializeRoutes() {
    this.app.use("/user", userRoutes)
    this.app.use("/admin", adminRoutes)

    // Catch-all route handler for invalid routes
    this.app.use((_req: Request, res: Response) => {
      res.status(404).json({ error: "Not Found" })
    })
  }

  private initializeErrorHandling() {
    this.app.use((err: Error, _req: Request, res: Response) => {
      console.error("Error:", err.message)
      res.status(500).json({ error: "Internal Server Error" })
    })
  }

  private socketIoSetup() {
    console.log(53);
    this.io.on("connection", socket => {
      console.log(`Socket connected: ${socket.id}`, 53);
      socket.emit('message', 'hello fron the server')
      socket.on('client-event', data => {
        console.log('Message recieved from client', data, 56);
      })
      
    })
  }

  public startServer() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`)
    })
  }
}
