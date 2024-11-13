import NotFoundException from '#exceptions/exercises/not_found_exception'
import UnauthorizedException from '#exceptions/exercises/unauthorized_exception'
import Exercise from '#models/exercise'
import { createExerciseValidator, updateExerciseValidator } from '#validators/exercise'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExercisesController {
  async store({ request, auth, response, params }: HttpContext) {
    const payload = await request.validateUsing(createExerciseValidator)
    const createdExercise = await Exercise.create({
      authorId: auth.user?.id,
      ...payload,
    })

    await createdExercise.related('classrooms').attach([params.id])

    return response.status(201).json(createdExercise)
  }

  async show({ params, auth }: HttpContext) {
    const exercise = await Exercise.find(params.exerciseId)
    if (!exercise) throw new NotFoundException()

    if (auth.user?.type === 'TEACHER') return exercise

    return exercise.serializeAttributes({ omit: ['expected'] })
  }

  async update({ request, params, auth }: HttpContext) {
    const payload = await request.validateUsing(updateExerciseValidator)
    const exercise = await Exercise.findOrFail(params.exerciseId)

    if (!exercise) throw new NotFoundException()

    if (exercise.authorId !== auth.user?.id) throw new UnauthorizedException()

    const updatedExercise = await exercise.merge({ ...payload }).save()

    return updatedExercise
  }

  async destroy({ auth, params }: HttpContext) {
    const exercise = await Exercise.findOrFail(params.exerciseId)

    if (!exercise) throw new NotFoundException()
    if (exercise.authorId !== auth.user?.id) throw new UnauthorizedException()

    await exercise.delete()
    return
  }
}
