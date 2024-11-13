import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  static status = 404
  static message = 'Not Found'
  static code = 'EXERCISE_NOT_FOUND'
}
