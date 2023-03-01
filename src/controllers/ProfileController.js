import fetch from 'node-fetch'

/**
 * Encapsulates a controller.
 */
export class ProfileController {

  test(req, res, next) {
    console.log('tEsT')
    console.log(req.session.accessToken)
    res.render('profile/profile', { req })
  }
}