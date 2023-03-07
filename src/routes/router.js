/**
 * The routes.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import express from 'express'
import { router as v1Router } from './api/v1/router.js'

export const router = express.Router()

router.use('/', v1Router)
