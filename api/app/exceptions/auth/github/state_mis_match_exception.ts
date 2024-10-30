import { Exception } from '@adonisjs/core/exceptions'

export default class StateMisMatchException extends Exception {
  static status = 401
  static message = "Unable to verify Github Oauth token mismatch"
}
