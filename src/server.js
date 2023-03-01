/**
 * The starting point of the application.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import { container } from './config/bootstrap.js'

import express from 'express'
import expressLayouts from 'express-ejs-layouts'
import helmet from 'helmet'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import createError from 'http-errors'
import { router } from './routes/router.js'
import session from 'express-session'
// import { connectDB } from './config/mongoose.js'

try {
  // await connectDB(container.resolve('ConnectionString')) // gör att vi får en koppling till vårt schema och i anslutning till det vår databas i vår IoC-container.

  const app = express()

  app.set('container', container) // gör att vi kommer åt containern i router. we store container in container.

  // Set various HTTP headers to make the application little more secure (https://www.npmjs.com/package/helmet).
  app.use(helmet())

  const directoryFullName = dirname(fileURLToPath(import.meta.url))
  app.use(express.urlencoded({ extended: false }))

  app.use(express.static(join(directoryFullName, '..', 'public')))

  const baseURL = process.env.BASE_URL || '/'

  // Parse requests of the content type application/json.
  app.use(express.json())

  app.set('view engine', 'ejs')
  app.set('views', join(directoryFullName, 'views'))
  app.use(expressLayouts)
  app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))

  app.use((req, res, next) => {
    res.locals.baseURL = baseURL
    next()
  })

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  app.use(session({
    secret: 'kalas',
    resave: false,
    saveUninitialized: true
  }))

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    if (!err.status) {
      const cause = err
      err = createError(500)
      err.cause = cause
    }

    if (req.app.get('env') !== 'development') {
      return res
        .status(err.status)
        .json({
          status: err.status,
          message: err.message
        })
    }

    // Development only!
    // Only providing detailed error in development.
    return res
      .status(err.status)
      .json({
        status: err.status,
        message: err.message,
        cause: err.cause ? JSON.stringify(err.cause, Object.getOwnPropertyNames(err.cause)) : undefined,
        stack: err.stack
      })
  })

  // Starts the HTTP server listening for connections.
  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
