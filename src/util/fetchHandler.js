import fetch from 'node-fetch'

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
