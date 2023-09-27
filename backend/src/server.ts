import express from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

import { ServerApp } from './ServerApp'

const app = express()
const serverApp = new ServerApp(app)

serverApp.startServer()