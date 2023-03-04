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
  // Adds XSS security to the application.
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'"],
        'img-src': ['gitlab.lnu.se', '*.gravatar.com']
      }
    })
  )


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

  // Set up a morgan logger using the dev format for log entries.
  app.use(logger('dev'))

  const sessionOptions = {
    name: process.env.SESSION_NAME, // Don't use default session cookie name.
    secret: process.env.SESSION_SECRET, // Change it!!! The secret is used to hash the session with HMAC.
    resave: false, // Resave even if a request is not changing the session.
    saveUninitialized: false, // Don't save a created but not modified session.
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: 'LAX'
    }
  }

  app.use(session(sessionOptions))


  app.use((req, res, next) => {
    if(req.session.loggedin) {
      res.locals.loggedin = req.session.loggedin
    }

    res.locals.baseURL = baseURL

    next()
  })

  // Register routes.
  app.use('/', router)

  // Error handler.
  app.use(function (err, req, res, next) {
    console.log(err)

    console.log(`${directoryFullName}/views/errors/404.html`)

    if (err.status === 404) {
      console.log('we are inside of error')
      return res
      .status(404)
      .render('errors/404')
    }

    if (err.status === 500) {
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
