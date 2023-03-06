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
const resolveAuthController = (req) => req.app.get('container').resolve('AuthController') // req.app --> instance of the express application

router.get('/test', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
// router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
// router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))

router.get('/login', (req, res, next) => resolveAuthController(req).login(req, res, next))
router.get('/logout', (req, res, next) => resolveAuthController(req).logout(req, res, next))
router.get('/callback', (req, res, next) => resolveAuthController(req).handleCallback(req, res, next))
