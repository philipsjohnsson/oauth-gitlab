import fetch from 'node-fetch'

export class AuthService {

  async logout(req, res, next) {

    let loggedOut = false

    const body = {
      client_id: process.env.APP_ID,
      client_secret: process.env.APP_SECRET,
      token: req.session?.accessToken
    }

    const URL = `https://gitlab.lnu.se/oauth/revoke`
    const response = await this.#fetchPost(URL, body)

    if(response.status === 200) {
      loggedOut = true
    }
    
    return loggedOut
  }

  async #fetchPost(URL, body) {
    
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

    return response
  }
}