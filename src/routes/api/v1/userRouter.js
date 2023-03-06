/**
 * API version 1 routes.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'

export const router = express.Router()

/**
 * Autenticate JWT.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJwt = (req, res, next) => {
  console.log('Authenticate jwt')
  next()
}

/**
 * Checks if the access token exists.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const checkIfAccessTokenExist = (req, res, next) => {
  try {
    const accessToken = req.session.accessToken

    if (!accessToken) {
      throw new Error('Not Found!')
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
