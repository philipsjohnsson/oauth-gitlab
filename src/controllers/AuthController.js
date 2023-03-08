/**
 * Module for the AuthController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { AuthService } from '../services/AuthService.js'
import { nanoid } from 'nanoid'
import createError from 'http-errors'

/**
 * Encapsulates a controller.
 */
export class AuthController {
  #authService

  /**
   * Constructor for AuthController.
   *
   * @param {object} service - AuthService.
   */
  constructor (service = new AuthService()) {
    this.#authService = service
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
    try {
      const loggedOut = this.#authService.logout(req, res, next)

      if (loggedOut) {
        res.locals.loggedin = undefined
        req.session.destroy()
        res.redirect('../../')
      } else {
        throw new Error('Server Error')
      }
    } catch (err) {
      err.status = 500
      next(createError(500))
    }
  }

  /**
   * Handles the callback and sets the access token.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async handleCallback (req, res, next) {
    try {
      const response = await this.#authService.handleCallback(req)

      if (response.status === 200) {
        const responseJson = await this.#authService.responseToJson(response)
        this.#authService.setSession(req, responseJson)

        res.redirect('../user/profile')
      } else {
        throw new Error('Not Found!')
      }
    } catch (err) {
      err.status = 404
      next(createError(404))
    }
  }
}
