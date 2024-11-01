import { Exception } from '@adonisjs/core/exceptions'

export default class AlreadyExistException extends Exception {
  static status = 401
  static message = 'Already exist'
  static code = 'CLASSROOM_STUDENT_ALREADY_EXIST'
}
