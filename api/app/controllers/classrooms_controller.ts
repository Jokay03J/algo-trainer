import AlreadyExistException from '#exceptions/classrooms/already_exist_exception'
import NotFoundException from '#exceptions/classrooms/not_found_exception'
import UnauthorizedException from '#exceptions/classrooms/unauthorized_exception'
import Classroom from '#models/classroom'
import User from '#models/user'
import {
  createClassroomValidator,
  inviteStudentValidator,
  updateClassroomValidator,
} from '#validators/classroom'
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
    await classroom.load('exercises')
    return classroom
  }

  async inviteStudent({ request, params }: HttpContext) {
    const payload = await request.validateUsing(inviteStudentValidator)

    const classroom = await Classroom.find(params.id)
    const user = await User.findBy('email', payload.email)
    if (!classroom || !user) throw new NotFoundException()
    const exist = await classroom
      .related('students')
      .pivotQuery()
      .where('user_id', user.id)
      .where('classroom_id', classroom.id)
      .first()
    if (exist) throw new AlreadyExistException()
    await classroom.related('students').attach([user.id])
  }

  async removeInvite({ params, auth }: HttpContext) {
    const classroom = await Classroom.find(params.id)
    if (!classroom) throw new NotFoundException()
    if (auth.user?.id !== classroom.authorId) throw new UnauthorizedException()
    await classroom.related('students').detach([params.studentId])
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, auth }: HttpContext) {
    const { name } = await request.validateUsing(updateClassroomValidator)
    const classroom = await Classroom.find(params.id)
    if (!classroom) throw new NotFoundException()

    if (classroom.authorId !== auth.user?.id) throw new UnauthorizedException()

    await classroom.merge({ name }).save()
    return classroom
  }

  /**
   * Delete record
   */
  async destroy({ params, auth }: HttpContext) {
    const classroom = await Classroom.find(params.id)
    if (!classroom) throw new NotFoundException()

    if (classroom.authorId !== auth.user?.id) throw new UnauthorizedException()
    await classroom.delete()
  }
}
