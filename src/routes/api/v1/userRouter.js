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
const resolveUserController = (req) => req.app.get('container').resolve('UserController') // req.app --> instance of the express application

router.get('/test', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
// router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
// router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))

router.get('/profile', (req, res, next) => resolveUserController(req).profile(req, res, next))
router.get('/activities', (req, res, next) => resolveUserController(req).activities(req, res, next))
router.get('/group-projects', (req, res, next) => resolveUserController(req).groupProjects(req, res, next))