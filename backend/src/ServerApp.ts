// serverApp.ts

import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import http from "http"
import rateLimit from "express-rate-limit"

import { mongo } from "./config/database"
import { userRoutes } from "./modules/user/interface/routes/user.routes"
import { adminRoutes } from "./modules/admin/interface/routes/admin.routes"
import { SocketService } from "./services/socketService.service"

export class ServerApp {
  private app: Application
  private port!: string
  private socketService: SocketService
  server: http.Server

  constructor(app: Application) {
    this.port = process.env.PORT!
    this.app = app
    this.server = http.createServer(this.app)
    this.socketService = SocketService.getInstance()
    this.socketService.setUpSocketIo(this.server)
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
    mongo()
  }

  private initializeMiddlewares() {
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 1000,
    })
    const corsOptions = {
      origin:["https://cric-connect.netlify.app", 'http://localhost:4200', "https://cric.uno"],
      optionsSuccessStatus: 200,
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // This allows session cookies to be sent back and forth
      allowedHeaders: ["Content-Type", "Authorization"],
    }
    this.app.use(cors(corsOptions))
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

  public startServer() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`)
    })
  }
}
