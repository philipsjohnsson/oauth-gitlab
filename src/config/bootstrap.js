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
import { HomeController } from '../controllers/HomeController.js'
import { LoginController } from '../controllers/LoginController.js'
import { ProfileController } from '../controllers/ProfileController.js'

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

iocContainer.register('ProfileController', ProfileController, {
singleton: true
})

iocContainer.register('LoginController', LoginController, {
singleton: true
})

iocContainer.register('HomeController', HomeController, {
  singleton: true
})

export const container = Object.freeze(iocContainer)