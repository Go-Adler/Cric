import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { userRoutes } from './modules/user/interface/user.routes'

export class ServerApp {
  private app: Application

  constructor(app: Application) {
    this.app = app
    this.initializeMiddlewares()
    this.initializeRoutes()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(cors())
    this.app.use(morgan('dev'))
    this.app.use(express.json())
  }

  private initializeRoutes() {
    this.app.use('/user', (req, res) => {
      res.json({message: 'successs'})
    } ,userRoutes)
  }


  private initializeErrorHandling() {
    this.app.use((err: Error, _req: Request, res: Response) => {
      console.log('hi');
      
      console.error('Error:', err.message)
      res.sendStatus(200).json({ error: 'Internal Server Error' })
    })
  }

 
  public startServer() {
    const port = process.env.PORT || 3000

    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`)
    })
  }
}
