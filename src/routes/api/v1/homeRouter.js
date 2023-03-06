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

router.get('/test', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
// router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))

router.get('/', (req, res, next) => resolveTasksController(req).index(req, res, next))

// router.get('/', (req, res, next) => resolveTasksController(req).login(req, res, next))

// Provide req.task to the route if :id is present in the route path.
/* router.param('id', (req, res, next, id) => resolveTasksController(req).loadTask(req, res, next, id))

// GET tasks
router.get('/', (req, res, next) => resolveTasksController(req).findAll(req, res, next))

// GET tasks/:id
router.get('/:id', (req, res, next) => resolveTasksController(req).find(req, res, next))

// POST tasks
router.post('/', (req, res, next) => resolveTasksController(req).create(req, res, next))

// PUT tasks/:id
router.put('/:id', (req, res, next) => resolveTasksController(req).update(req, res, next))

// DELETE tasks/:id
router.delete('/:id', (req, res, next) => resolveTasksController(req).delete(req, res, next)) */
