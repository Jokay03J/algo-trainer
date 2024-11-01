import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  static status = 404
  static message = 'Classroom not found'
  static code = 'CLASSROOM_NOT_FOUND'
}
