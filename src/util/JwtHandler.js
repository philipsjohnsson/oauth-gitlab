import jwt from 'jsonwebtoken'

/**
 *
 */
export class JwtHandler {
  /**
   * Gets the payload of the jwt.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   * @returns {object} - returns payload.
   */
  decodeJwt (req, res, next) {
    const payload = jwt.decode(req.session.jwtToken, process.env.APP_SECRET)
    return payload
  }
}
