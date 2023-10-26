import express, { Application, Request, Response } from "express"
import morgan from "morgan"
import cors from "cors"
import http from "http"

import { userRoutes } from "./modules/user/interface/routes/user.routes"
import { adminRoutes } from "./modules/admin/interface/routes/admin.routes"
import { mongo } from "./config/database"

export class ServerApp {
  private app: Application
  private server: http.Server
  private port!: string

  constructor(app: Application) {
    this.port = process.env.PORT!
    this.app = app
    this.server = http.createServer(this.app)
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
    mongo()
  }

  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(morgan("dev"))
    this.app.use(express.json())
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
