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
 * Checks if the access token exists.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const checkIfAccessTokenExist = (req, res, next) => {
  try {
    const accessToken = req.session.accessToken
    console.log('We are inside of check access token')

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
const resolveAuthController = (req) => req.app.get('container').resolve('AuthController') // req.app --> instance of the express application

router.get('/login', (req, res, next) => resolveAuthController(req).login(req, res, next))
router.get('/callback', (req, res, next) => resolveAuthController(req).handleCallback(req, res, next))

router.all('*', checkIfAccessTokenExist)
router.get('/logout', (req, res, next) => resolveAuthController(req).logout(req, res, next))
