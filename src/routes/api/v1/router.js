/**
 * API version 1 routes.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import express from 'express'
import createError from 'http-errors'
import { router as homeRouter } from './homeRouter.js'
import { router as authRouter } from './authRouter.js'
import { router as userRouter } from './userRouter.js'

export const router = express.Router()

// router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
router.use('/', homeRouter)
router.use('/auth', authRouter)
router.use('/user', userRouter)

router.use('*', (req, res, next) => next(createError(404)))