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

  authenticateJwt() {
    console.log('authenticate jwt')
  }

  async profile(req, res, next) {
    console.log('tEsT')
    console.log(req.session.accessToken)
    console.log(req.session.jwtToken)

    const viewData = await this.#service.profile(req, res, next)
    res.render('user/profile', { viewData })
  }

  groupProjects(req, res, next) {
    console.log('we are getting inside of group-projects')

    this.#service.groupProjects(req, res, next)

    res.render('user/group-projects')
  }

  async activities(req, res, next) {
    console.log('we are getting inside of activities')


    const viewData = await this.#service.activities(req, res, next)
    // console.log(viewData)

    res.render('user/activities', { viewData })
  }
}