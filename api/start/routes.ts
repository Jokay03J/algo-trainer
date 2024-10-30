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
const AuthController = async () => await import('#controllers/auth_controller')

router
  .group(() => {
    router.get('github/redirect', [AuthController, 'redirect'])
    router.get('github/callback', [AuthController, 'callback'])
  })
  .prefix('auth')

router
  .group(() => {
    const ClassroomsController = async () => await import('#controllers/classrooms_controller')
    router
      .group(() => {
        router.post('/', [ClassroomsController, 'store'])
        router.post('/:id/invite', [ClassroomsController, 'inviteStudent'])
      })
      .use(middleware.mustBeTeacher())
    router.get('/', [ClassroomsController, 'index'])
    router.get('/:id', [ClassroomsController, 'show'])
  })
  .prefix('classrooms')
  .use(middleware.auth())
