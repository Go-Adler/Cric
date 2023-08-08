import express, { Application, Request, Response } from 'express'

import { userRoutes } from './modules/user/inteface/user.routes'

export class ServerApp {
  private app: Application

  constructor(app: Application) {
    this.app = app
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(express.json())
  }

  private initializeRoutes() {
    this.app.use('/user', userRoutes)
  }


  private initializeErrorHandling() {
    this.app.use((err: Error, _req: Request, res: Response) => {
      console.error('Error:', err.message)
      res.status(500).json({ error: 'Internal Server Error' })
    })
  }

 
  public startServer() {
    const port = process.env.PORT || 3000

    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  }
}
