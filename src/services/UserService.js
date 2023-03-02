import fetch from 'node-fetch'
import { JwtHandler } from '../util/JwtHandler.js'

export class UserService {

  #jwtHandler

  constructor() {
    this.#jwtHandler = new JwtHandler()
  }

  async profile(req, res, next) {
    console.log('we are inside of profile in UserService')
    console.log(req.session.accessToken)

    const payloadJwt = this.#jwtHandler.decodeJwt(req, res, next)
    console.log(payloadJwt)

    /* const userData = {
      email: payloadJwt.email
    } */

    // this.#fetchGet(`https://gitlab.lnu.se/api/v4/projects?access_token=${req.session.accessToken}`)
    return this.#fetchGet(`https://gitlab.lnu.se/api/v4/user`, req)
    
    // this.#fetchGet(`https://gitlab.lnu.se/api/v4/users/avatar`)
  }

  async activities(req, res, next) {
    console.log('activities')
    const arrPages = []

    for(let i = 1; i <= 2; i++) {
      arrPages.push(await this.#fetchGet(`https://gitlab.lnu.se/api/v4/events?per_page=51&page=${i}`, req))
    }
    console.log(arrPages)
    return arrPages
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

  async #fetchGet(URL, req) {
    
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.session.accessToken
      }
    })
    console.log('______________________________RESPONSE /USERS____________________')
    const user = await response.json()
    // console.log(user)
    
    return user
  }
}