/**
 * API version 1 routes.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'

export const router = express.Router()

const authenticateJwt = (req, res, next) => {
  console.log('Authenticate jwt')
  next()
}

const checkIfAccessTokenExist = (req, res, next) => {
  try {
    console.log('check if access token exist inside of usercontroller')

    console.log('checkIfAccessTokenExist')
    console.log('------------')
    const accessToken = req.session.accessToken
    console.log(accessToken)
    console.log('------------')
    if(!accessToken) {
      console.log('TEST we are inside of error 404')
      throw new Error('Not Found!')
      // res.render('errors/404')
      // next(createError(404))
    } else {
      next()
    }
  } catch (error) {
    next(createError(404))
  }
}

/**
 * Resolves a TasksController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a TasksController object.
 */
const resolveUserController = (req) => req.app.get('container').resolve('UserController') // req.app --> instance of the express application

router.get('/test', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
router.all('*', checkIfAccessTokenExist)
// router.all('*', authenticateJwt)

router.get('/profile', (req, res, next) => resolveUserController(req).profile(req, res, next))
router.get('/activities', (req, res, next) => resolveUserController(req).activities(req, res, next))
router.get('/group-projects', (req, res, next) => resolveUserController(req).groupProjects(req, res, next))