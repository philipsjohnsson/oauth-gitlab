/**
 * UserService for the application.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import { fetchGet, graphQlPost } from '../util/fetchHandler.js'

/**
 *
 */
export class UserService {
  /**
   * Fetches the data for the profile.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async profile (req, res, next) {
    return fetchGet('https://gitlab.lnu.se/api/v4/user', req)
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
      arrPages.push(...await fetchGet(`https://gitlab.lnu.se/api/v4/events?per_page=51&page=${i}`, req))
    }

    arrPages.forEach((element) => {
      element.created_at = element.created_at.substring(0, 19).replace('T', ' ')
    })

    return arrPages
  }

  /**
   * Fetches the data for the groups and projects.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async groupProjects (req, res, next) {
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

    return await graphQlPost('https://gitlab.lnu.se/api/graphql', req, query)
  }
}
