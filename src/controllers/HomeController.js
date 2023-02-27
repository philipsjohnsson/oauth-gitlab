/**
 * Module for the TasksController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

// import createError from 'http-errors'
// import { TasksService } from '../services/TasksService.js'

/**
 * Encapsulates a controller.
 */
export class HomeController {

  async consoletest(req, res, next) {
    console.log('we are inside of consoletest in controller')
  }
  
  index (req, res, next) {
    res.render('home/index')
  }
}