import jwt from 'jsonwebtoken'

export class JwtHandler {

  decodeJwt(req, res, next) {
    // const jwt_parts = responseJson.id_token.split('.')
    const payload = jwt.decode(req.session.jwtToken, process.env.APP_SECRET)
    return payload
  }

}