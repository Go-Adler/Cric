import express, { Application, Request, Response } from 'express'

export class serverApp {
  private app: Application

  constructor(app: Application) {
    this.app = app
    this.initializeMiddlewares()
    this.initializeErrorHandling()
  }

  private initializeMiddlewares() {
    this.app.use(express.json)
  }

  private initializeErrorHandling() {
    this.app.use((err: Error, _req: Request, res: Response) => {
      console.error('Error:', err)
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
