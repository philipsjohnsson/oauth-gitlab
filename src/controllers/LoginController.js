/**
 * Module for the TasksController.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

// import createError from 'http-errors'
// import { TasksService } from '../services/TasksService.js'
import fetch from 'node-fetch'

/**
 * Encapsulates a controller.
 */
export class LoginController {

    async consoletest(req, res, next) {
      console.log('we are inside of consoletest in controller')
    }
    
    // https://gitlab.example.com/oauth/authorize?client_id=APP_ID&redirect_uri=REDIRECT_URI&response_type=code&state=STATE&scope=REQUESTED_SCOPES&code_challenge=CODE_CHALLENGE&code_challenge_method=S256
    async login(req, res, next) {
      console.log('we are inside of login')
      // const response = await fetch(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`)
/*       console.log(response)
      console.log('.............')
      console.log(response.code) */
      console.log(process.env.REDIRECT_URI)
      res.redirect(`https://gitlab.lnu.se/oauth/authorize?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`)

      /* const parameters = `client_id=${process.env.APP_ID}&code=${}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}`
      const responseToken = await fetch(`https://gitlab.lnu.se/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
      }) */

      console.log('-----------------')
      // console.log(responseToken)
      // res.redirect(response.url)

    }

    // Revoke, session.destroy
    async logout(req, res, next) {
      console.log(req.session?.accessToken)
      const body = {
        client_id: process.env.APP_ID,
        client_secret: process.env.APP_SECRET,
        token: req.session?.accessToken
      }

      const response = await fetch(`https://gitlab.lnu.se/oauth/revoke`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      console.log(response)
      console.log('revoke a token')
      
      console.log(response.status)
      if(response.status === 200) {
        req.session.destroy()
      }
      console.log(req.session)
    }

    async handleCallback(req, res, next) {
      console.log('we are inside of handleCallback')
      console.log(req.query.code)
      // const parameters = `client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&code=${req.query.code}&grant_type=authorization_code&redirect_uri=${process.env.REDIRECT_URI}`
      const body = {
        client_id: process.env.APP_ID,
        client_secret: process.env.APP_SECRET,
        code: req.query.code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: 'authorization_code'
      }
      const response = await fetch(`https://gitlab.lnu.se/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      console.log('_________________________________________________________')
      console.log(response)
      const responseJson = await response.json()
      req.session.accessToken = responseJson.access_token
      console.log(req.session.accessToken)
      // res.redirect('/profile/profile')
      // res.render('profile/profile', { req })
      // res.redirect('../profile/profile')
      res.redirect('../profile/profile')
      // res.render('../profile/profile', { req })
    }
  }