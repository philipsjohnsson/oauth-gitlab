import createHttpError from 'http-errors'
import { UserService } from '../services/UserService.js'

/**
 * Encapsulates a controller.
 */
export class UserController {
  #service

  /**
   * Constructor of the UserController.
   *
   * @param {object} service - UserService.
   */
  constructor (service = new UserService()) {
    this.#service = service
  }

  /**
   * Renders the profile.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async profile (req, res, next) {
    try {
      const viewData = await this.#service.profile(req, res, next)

      res.render('user/profile', { viewData })
    } catch (err) {
      err.status = 500
      next(createHttpError(500))
    }
  }

  /**
   * Renders the group projects.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async groupProjects (req, res, next) {
    try {
      const viewData = await this.#service.groupProjects(req, res, next)

      res.render('user/group-projects', { viewData })
    } catch (err) {
      err.status = 500
      next(createHttpError(500))
    }
  }

  /**
   * Renders the activities.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async activities (req, res, next) {
    try {
      const viewData = await this.#service.activities(req, res, next)

      res.render('user/activities', { viewData })
    } catch (err) {
      err.status = 500
      next(createHttpError(500))
    }
  }
}
