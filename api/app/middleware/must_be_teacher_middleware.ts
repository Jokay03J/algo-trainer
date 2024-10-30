import MustBeTeacherException from '#exceptions/middleware/must_be_teacher_exception'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class MustBeTeacherMiddleware {
  async handle({ auth }: HttpContext, next: NextFn) {
    if (!auth.user || auth.user.type !== 'TEACHER') throw new MustBeTeacherException()

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
