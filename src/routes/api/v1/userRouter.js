/**
 * API version 1 routes.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { fetchPost } from '../../../util/fetchHandler.js'

export const router = express.Router()

/**
 * Autenticate JWT.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateJwt = async (req, res, next) => {
  try {
    const timeCreatedTokenAddedWithTokenExpired = req.session.tokenExpires + req.session.tokenCreatedAt
    const timeRightNowInSeconds = Date.now() / 1000
    if (timeRightNowInSeconds > timeCreatedTokenAddedWithTokenExpired) { // byt till: >
      const body = {
        client_id: process.env.APP_ID,
        client_secret: process.env.APP_SECRET,
        refresh_token: req.session.refreshToken,
        grant_type: 'refresh_token',
        redirect_uri: process.env.REDIRECT_URI
      }
      const response = await fetchPost('https://gitlab.lnu.se/oauth/token', req, body)
      const responseJson = await response.json()
      if (response.status === 200) {
        req.session.jwtToken = responseJson.id_token
        req.session.accessToken = responseJson.access_token
        req.session.loggedin = true
        req.session.tokenExpires = responseJson.expires_in
        req.session.tokenCreatedAt = responseJson.created_at
        req.session.refreshToken = responseJson.refresh_token
      } else {
        res.locals.loggedin = undefined
        req.session.destroy()
        throw new Error('Forbidden!')
      }
      next()
    } else {
      next()
    }
  } catch (err) {
    next(createError(403))
  }
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
router.all('*', authenticateJwt)
// router.all('*', authenticateJwt)

router.get('/profile', (req, res, next) => resolveUserController(req).profile(req, res, next))
router.get('/activities', (req, res, next) => resolveUserController(req).activities(req, res, next))
router.get('/group-projects', (req, res, next) => resolveUserController(req).groupProjects(req, res, next))
