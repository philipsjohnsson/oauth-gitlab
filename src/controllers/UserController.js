import fetch from 'node-fetch'
import { UserService } from '../services/UserService.js'

/**
 * Encapsulates a controller.
 */
export class UserController {


  #service

  constructor(service = new UserService()) {
    this.#service = service
  }

  profile(req, res, next) {
    console.log('tEsT')
    console.log(req.session.accessToken)
    this.#service.profile(req, res, next)
    res.render('user/profile', { req })
  }

  groupProjects(req, res, next) {
    console.log('we are getting inside of group-projects')

    res.render('user/group-projects')
  }

  activities(req, res, next) {
    console.log('we are getting inside of activities')

    res.render('user/activities')
  }
}