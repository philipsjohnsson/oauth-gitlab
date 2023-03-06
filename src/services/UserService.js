import fetch from 'node-fetch'
import { JwtHandler } from '../util/JwtHandler.js'
import { GraphQLClient } from 'graphql-request'

/**
 *
 */
export class UserService {
  #jwtHandler

  /**
   * Constructor for the UserService.
   */
  constructor () {
    this.#jwtHandler = new JwtHandler()
  }

  /**
   * Fetches the data for the profile.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async profile (req, res, next) {
    const payloadJwt = this.#jwtHandler.decodeJwt(req, res, next)
    console.log(payloadJwt)

    /* const userData = {
      email: payloadJwt.email
    } */

    // this.#fetchGet(`https://gitlab.lnu.se/api/v4/projects?access_token=${req.session.accessToken}`)
    return this.#fetchGet('https://gitlab.lnu.se/api/v4/user', req)

    // this.#fetchGet(`https://gitlab.lnu.se/api/v4/users/avatar`)
  }

  /**
   * Fetches the data for activities.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async activities (req, res, next) {
    const arrPages = []

    for (let i = 1; i <= 2; i++) {
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
  /**
   * Fetches the data for the groups and projects.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async groupProjects (req, res, next) {
    return await this.#graphQL('https://gitlab.lnu.se/api/graphql', req)
  }

  /**
   * Fetches data using get method.
   *
   * @param {string} URL - url to fetch.
   * @param {object} req - Express request object.
   */
  async #fetchGet (URL, req) {
    const response = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + req.session.accessToken
      }
    })
    const responseJson = await response.json()

    return responseJson
  }

  /**
   * Fetches the data using graphQL.
   *
   * @param {string} URL - url to fetch.
   * @param {object} req - Express request object.
   */
  async #graphQL (URL, req) {
    const query = `query {
      currentUser {
        groups(first: 4) {
          nodes {
            name
            id
            avatarUrl
            fullPath
            path
                projects(first: 6, includeSubgroups: true) {
                    nodes {
                        id
                        name
                        avatarUrl
                        path
                        fullPath
                        repository {
                          tree {
                            lastCommit {
                              authoredDate 
                                author {
                                  name 
                                  username 
                                  avatarUrl
                                }
                              }
                            }
                          }
                      projectMembers {       
                        nodes {
                          createdBy {
                            name
                            username
                            avatarUrl
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

    return await client.request(query)
  }
}
