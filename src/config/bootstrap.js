/**
 * Module for bootstrapping.
 *
 * @author Mats Loock
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'
// import { TaskModel } from '../models/TaskModel.js'
// import { TaskRepository } from '../repositories/TaskRepository.js'
// import { TasksService } from '../services/TasksService.js'
import { AuthService } from '../services/AuthService.js'
import { UserService } from '../services/UserService.js'
import { HomeController } from '../controllers/HomeController.js'
import { AuthController } from '../controllers/AuthController.js'
import { UserController } from '../controllers/UserController.js'


const iocContainer = new IoCContainer()

// iocContainer.register('ConnectionString', process.env.DB_CONNECTION_STRING)

// iocContainer.register('TaskModelType', TaskModel, { type: true }) // sätter type: true för att det är en funktion, men han vill ändå att den ska köras, i bootstrap körs ändå definition med hjälp av det här..

/* iocContainer.register('TaskRepositorySingleton', TaskRepository, {
  dependencies: [
    'TaskModelType'
  ],
  singleton: true
}) */

/* iocContainer.register('TasksServiceSingleton', TasksService, {
  dependencies: [
    'TaskRepositorySingleton'
  ],
  singleton: true
}) */

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