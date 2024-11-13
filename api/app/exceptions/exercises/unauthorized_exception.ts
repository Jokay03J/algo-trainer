import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthorizedException extends Exception {
  static status = 401
  static message = 'You must be the exercise owner !'
  static code = 'EXERCISE_UNAUTHORIZED'
}
