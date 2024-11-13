/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger/dist/index.js'
import swagger from '#config/swagger'

router
  .group(() => {
    const AuthController = async () => await import('#controllers/auth_controller')
    router.get('github/redirect', [AuthController, 'redirect'])
    router.get('github/callback', [AuthController, 'callback'])
  })
  .prefix('auth')

router
  .group(() => {
    const ClassroomsController = async () => await import('#controllers/classrooms_controller')

    router
      .group(() => {
        // classroom invite
        router.post('/:id/invite', [ClassroomsController, 'inviteStudent'])
        router.delete('/:id/invite/:studentId', [ClassroomsController, 'removeInvite'])

        // classrooms CRUD
        router.post('/', [ClassroomsController, 'store'])
        router.put('/:id', [ClassroomsController, 'update'])
        router.delete('/:id', [ClassroomsController, 'destroy'])
      })
      .use(middleware.mustBeTeacher())
    router.get('/', [ClassroomsController, 'index'])
    router.get('/:id', [ClassroomsController, 'show'])
  })
  .prefix('classrooms')
  .use(middleware.auth())

router
  .group(() => {
    const ExercisesController = async () => await import('#controllers/exercises_controller')

    router
      .group(() => {
        router.post('/', [ExercisesController, 'store'])
        router.put('/:exerciseId', [ExercisesController, 'update'])
        router.delete('/:exerciseId', [ExercisesController, 'destroy'])
      })
      .middleware(middleware.mustBeTeacher())

    router.group(() => {
      router.get('/:exerciseId', [ExercisesController, 'show'])
    })
  })
  .prefix('classrooms/:id/exercises')
  .middleware(middleware.auth())

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})
