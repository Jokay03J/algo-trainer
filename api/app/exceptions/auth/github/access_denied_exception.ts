import { Exception } from '@adonisjs/core/exceptions'

export default class AccessDeniedException extends Exception {
  static status = 401
  static message = "Github OAuth Access denied"
}
