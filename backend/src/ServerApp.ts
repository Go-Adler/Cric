import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { userRoutes } from './modules/user/interface/routes/user.routes'
import { adminRoutes } from './modules/admin/interface/routes/admin.routes'
import { mongo} from './config/database'

// Define the ServerApp class
export class ServerApp {
  private app: Application

  // Constructor to initialize the Express application
  constructor(app: Application) {
    this.app = app
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
    mongo()
  }

   // Set up middlewares
  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(express.json())
  }

   // Set up routes
  private initializeRoutes() {
    this.app.use('/user', userRoutes)
    this.app.use('/admin', adminRoutes)

    // Catch-all route handler for invalid routes
    this.app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: 'Not Found' });
  });
  }

  private initializeErrorHandling() {
    this.app.use((err: Error, _req: Request, res: Response) => {
      console.error('Error:', err.message)
      res.status(500).json({ error: 'Internal Server Error' })
    })
  }
  
  public startServer() {
    const port = process.env.PORT

    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  }
}
