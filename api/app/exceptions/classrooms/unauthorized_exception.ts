import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthorizedException extends Exception {
  static status = 401
  static code = 'CLASSROOM_UNAUTHORIZED'
  static message = 'Unauthorized'
}
