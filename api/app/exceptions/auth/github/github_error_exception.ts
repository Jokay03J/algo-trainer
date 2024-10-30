import { Exception } from '@adonisjs/core/exceptions'

export default class GithubErrorException extends Exception {
  static status = 500
}