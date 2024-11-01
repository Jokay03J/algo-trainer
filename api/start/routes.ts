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
const AuthController = async () => await import('#controllers/auth_controller')
const ClassroomsController = async () => await import('#controllers/classrooms_controller')

router
  .group(() => {
    router.get('github/redirect', [AuthController, 'redirect'])
    router.get('github/callback', [AuthController, 'callback'])
  })
  .prefix('auth')

router
  .group(() => {
    router
      .group(() => {
        router.post('/', [ClassroomsController, 'store'])
        router.post('/:id/invite', [ClassroomsController, 'inviteStudent'])
        router.delete('/:id/invite/:studentId', [ClassroomsController, 'removeInvite'])
        router.put('/:id', [ClassroomsController, 'update'])
        router.delete('/:id', [ClassroomsController, 'destroy'])
      })
      .use(middleware.mustBeTeacher())
    router.get('/', [ClassroomsController, 'index'])
    router.get('/:id', [ClassroomsController, 'show'])
  })
  .prefix('classrooms')
  .use(middleware.auth())

// returns swagger in YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Renders Swagger-UI and passes YAML-output of /swagger
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
  // return AutoSwagger.default.scalar("/swagger"); to use Scalar instead
  // return AutoSwagger.default.rapidoc("/swagger", "view"); to use RapiDoc instead (pass "view" default, or "read" to change the render-style)
})
