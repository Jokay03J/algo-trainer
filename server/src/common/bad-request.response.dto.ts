export class BadRequestResponse {
  /**
   * The error type.
   * @example Bad Request
   */
  error: string;
  /**
   * The status code.
   * @example 400
   */
  statusCode: number;
  /**
   * The error message.
   * @example ["name must be a string"]
   */
  message: string[];
}
