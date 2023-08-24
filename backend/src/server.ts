import express from 'express'
import dotenv from 'dotenv'

import { ServerApp } from './ServerApp'

dotenv.config({path: './.env'})

const app = express()
const serverApp = new ServerApp(app)

serverApp.startServer()