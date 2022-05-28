import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import express, { NextFunction, Request, Response } from 'express'
import StatusCodes from 'http-status-codes'
import 'express-async-errors'

import mongoose, { ConnectOptions } from 'mongoose'

import baseRouter from './routes'

const app = express()
const { BAD_REQUEST } = StatusCodes

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

const corsConfig = {
  origin: '*',
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsConfig))
// Add APIs
app.use('/api', baseRouter)

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(BAD_REQUEST).json({
    success: false,
    error: err.message,
  })
})

// eslint-disable-next-line max-len
const DB_URL = `mongodb+srv://makki:${process.env.DATABASE_PASSWORD}@dmanz-services.mxcnl.mongodb.net/agnos-test?retryWrites=true&w=majority`

mongoose.connect(DB_URL).then(() => console.info('DB connection successful'))

// Export express instance
export default app
