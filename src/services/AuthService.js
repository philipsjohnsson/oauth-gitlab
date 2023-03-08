import { fetchPostWithoutToken } from '../util/fetchHandler.js'

/**
 *
 */
export class AuthService {
  /**
   * Logout the user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async logout (req, res, next) {
    let loggedOut = false

    const body = {
      client_id: process.env.APP_ID,
      client_secret: process.env.APP_SECRET,
      token: req.session?.accessToken
    }

    const URL = 'https://gitlab.lnu.se/oauth/revoke'
    const response = await fetchPostWithoutToken(URL, body)

    if (response.status === 200) {
      loggedOut = true
    }

    return loggedOut
  }

  async handleCallback (req) {
    const body = {
      client_id: process.env.APP_ID,
      client_secret: process.env.APP_SECRET,
      code: req.query.code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    }

    const response = await fetchPostWithoutToken('https://gitlab.lnu.se/oauth/token', body)

    return response
  }

  async responseToJson (response) {
    return await response.json()
  }

  setSession (req, responseJson) {
    req.session.jwtToken = responseJson.id_token
    req.session.accessToken = responseJson.access_token
    req.session.loggedin = true
    req.session.tokenExpires = responseJson.expires_in
    req.session.tokenCreatedAt = responseJson.created_at
    req.session.refreshToken = responseJson.refresh_token
  }
}
