import fetch from 'node-fetch'
import { JwtHandler } from '../util/JwtHandler.js'
import { GraphQLClient } from 'graphql-request'

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
      arrPages.push(...await this.#fetchGet(`https://gitlab.lnu.se/api/v4/events?per_page=51&page=${i}`, req))
    }
    
    arrPages.forEach((element) => {
      element.created_at = element.created_at.substring(0, 19).replace('T', ' ')
    })

    return arrPages
  }
  
  // GET /groups/:id/subgroups
  // GET /groups/:id/projects
  // https://gitlab.com/-/graphql-explorer?_gl=1*4y40fq*_ga*MzEyNjI1MDQ5LjE2Nzc0NDU0Mjk.*_ga_ENFH3X7M5Y*MTY3NzgzMjMyOC4yMi4xLjE2Nzc4MzI0NTQuMC4wLjA.
  async groupProjects(req, res, next) {
    console.log('-- group projects --')
    const projects = await this.#graphQL(`https://gitlab.lnu.se/api/graphql`, req)
    /* projects.forEach(async (element) => {
      console.log(element.full_path)
      // console.log(await this.#fetchGet(`https://gitlab.lnu.se/api/v4/groups/${element.full_path}/projects`, req))
    }) */
    // console.log(projects)
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
    console.log(user)
    
    return user
  }

  async #graphQL(URL, req) {

    console.log(req.session.accessToken)

    const query = `query {
      currentUser {
        
        groups(first: 3) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            name
            fullPath
            avatarUrl
            path
                projects(includeSubgroups: true) {
                    nodes {
                        id
                        name
                        fullPath
                        avatarUrl
                        path
                        repository {tree {lastCommit {authoredDate author {name username avatarUrl}}}}
                      projectMembers {       
                        nodes {
                          createdBy {
                            name
                            avatarUrl
                            username
                          }
                        }
                      }
                    }
                }
            }
          }
        }
      }`

      const client = new GraphQLClient(URL, {
        headers: {
          Authorization: `Bearer ${req.session.accessToken}`
        }
      })

      const graphQLfetch = await client.request(query)
      console.log(graphQLfetch)
      console.log(graphQLfetch.currentUser.groups)

  }
}