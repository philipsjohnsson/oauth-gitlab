/**
 * Module for the TasksController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

/**
 * Encapsulates a controller.
 */
export class HomeController {
  /**
   * Shows the home page.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  index (req, res, next) {
    res.render('home/index')
  }
}
