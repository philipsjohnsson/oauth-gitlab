/**
 * Module for bootstrapping.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'
import { AuthService } from '../services/AuthService.js'
import { UserService } from '../services/UserService.js'
import { HomeController } from '../controllers/HomeController.js'
import { AuthController } from '../controllers/AuthController.js'
import { UserController } from '../controllers/UserController.js'

const iocContainer = new IoCContainer()

iocContainer.register('UserService', UserService, {
  singleton: true
})

iocContainer.register('AuthService', AuthService, {
  singleton: true
})

iocContainer.register('UserController', UserController, {
  dependencies: [
    'UserService'
  ],
  singleton: true
})

iocContainer.register('AuthController', AuthController, {
  dependencies: [
    'AuthService'
  ],
  singleton: true
})

iocContainer.register('HomeController', HomeController, {
  singleton: true
})

export const container = Object.freeze(iocContainer)
