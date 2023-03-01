import fetch from 'node-fetch'

/**
 * Encapsulates a controller.
 */
export class ProfileController {

  profile(req, res, next) {
    console.log('tEsT')
    console.log(req.session.accessToken)
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