import { Exception } from '@adonisjs/core/exceptions'

export default class MustBeTeacherException extends Exception {
  static status = 403
  static message = 'Must be a teacher'
}
