/**
 * Module for the TasksController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import { AuthService } from '../services/AuthService.js'
import { nanoid } from 'nanoid'
import jwt from 'jsonwebtoken'

/**
 * Encapsulates a controller.
 */
export class AuthController {
  #service

  /**
   * Constructor for AuthController.
   *
   * @param {object} service - AuthService.
   */
  constructor (service = new AuthService()) {
    this.#service = service
  }

  /**
   * Login for user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    const state = nanoid()

    res.redirect(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&state=${state}&scope=${process.env.REQUESTED_SCOPE}`)
  }

  // Revoke, session.destroy
  /**
   * Logout the user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logout (req, res, next) {
    console.log(req.session?.accessToken)
    const loggedOut = this.#service.logout(req, res, next)

    if (loggedOut) {
      res.locals.loggedin = undefined
      req.session.destroy()
    }

    res.redirect('../../')
  }

  /**
   * Handles the callback and sets the access token.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async handleCallback (req, res, next) {
    const body = {
      client_id: process.env.APP_ID,
      client_secret: process.env.APP_SECRET,
      code: req.query.code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    }
    const response = await fetch('https://gitlab.lnu.se/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const responseJson = await response.json()

    const payload = jwt.decode(responseJson.id_token, process.env.APP_SECRET)

    console.log('payload:')
    console.log(payload)

    req.session.jwtToken = responseJson.id_token
    req.session.accessToken = responseJson.access_token
    req.session.loggedin = true
    res.redirect('../user/profile')
  }
}
