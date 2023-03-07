/**
 * API version 1 routes.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves a TasksController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a TasksController object.
 */
const resolveTasksController = (req) => req.app.get('container').resolve('HomeController') // req.app --> instance of the express application

router.get('/', (req, res, next) => resolveTasksController(req).index(req, res, next))
