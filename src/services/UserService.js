import fetch from 'node-fetch'

export class UserService {

  async profile(req, res, next) {
    console.log('we are inside of profile in UserService')
    console.log(req.session.accessToken)


    const body = {
      access_token: req.session.accessToken
    }
    // this.#fetchGet(`https://gitlab.lnu.se/api/v4/projects?access_token=${req.session.accessToken}`)
    this.#fetchGet(`https://gitlab.lnu.se/api/v4/users/avatar?access_token=${req.session.accessToken}`)
  }

  async #fetchPost(URL, body) {
    
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })

    console.log(response)

    return response
  }

  async #fetchGet(URL) {
    
    const response = await fetch(URL)

    console.log(response)

    return response
  }
}