import fetch from 'node-fetch'
import { GraphQLClient } from 'graphql-request'

/**
 *
 */
export const fetchPost = async (URL, req, body) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + req.session.accessToken
    },
    body: JSON.stringify(body)
  })
  console.log(response)

  return response
}

/**
 * Fetch data post.
 *
 * @param {string} URL - the url to fetch.
 * @param {object} body - the body to include when fetching.
 */
export const fetchPostWithoutToken = async (URL, body) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  return response
}

/**
 * Fetches data using get method.
 *
 * @param {string} URL - url to fetch.
 * @param {object} req - Express request object.
 */
export const fetchGet = async (URL, req) => {
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
 * @param {string} query - query.
 */
export const graphQlPost = async (URL, req, query) => {
  const client = new GraphQLClient(URL, {
    headers: {
      Authorization: `Bearer ${req.session.accessToken}`
    }
  })

  return await client.request(query)
}
