import Classroom from '#models/classroom'
import User from '#models/user'
import { createClassroomValidator, inviteStudentValidator } from '#validators/classroom'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClassroomsController {
  /**
   * Display a list of resource
   */
  async index({ auth }: HttpContext) {
    const classroomsQuery = Classroom.query().preload('students')

    if (auth.user?.type === 'TEACHER') classroomsQuery.where('author_id', auth.user?.id!)

    const classrooms = await classroomsQuery.exec()

    return classrooms
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(createClassroomValidator)
    const createdClassroom = await Classroom.create({ ...payload, authorId: auth.user?.id })

    return createdClassroom
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const classroom = await Classroom.find(params.id)
    if (!classroom) throw new Error('Not found')
    await classroom.load('author')
    await classroom.load('students')
    return classroom
  }

  async inviteStudent({ request, params }: HttpContext) {
    const payload = await request.validateUsing(inviteStudentValidator)

    const classroom = await Classroom.find(params.id)
    const user = await User.findBy('email', payload.email)
    if (!classroom || !user) throw new Error('Not found') // TODO: make excepetion
    const exist = await classroom
      .related('students')
      .pivotQuery()
      .where('user_id', user.id)
      .where('classroom_id', classroom.id)
      .first()
    if (exist) throw new Error('Already exist !') // TODO: this too
    await classroom.related('students').attach([user.id])
  }

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  // async destroy({ params }: HttpContext) {}
}
