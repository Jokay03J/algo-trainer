import AccessDeniedException from '#exceptions/auth/github/access_denied_exception'
import GithubErrorException from '#exceptions/auth/github/github_error_exception'
import StateMisMatchException from '#exceptions/auth/github/state_mis_match_exception'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  redirect({ ally }: HttpContext) {
    return ally.use('github').stateless().redirect()
  }

  async callback({ ally }: HttpContext) {
    const gh = ally.use('github').stateless()

    if (gh.accessDenied()) throw new AccessDeniedException()

    if (gh.stateMisMatch()) throw new StateMisMatchException()

    if (gh.hasError()) throw new GithubErrorException(gh.getError()!)

    const { avatarUrl, email, id, name, nickName } = await gh.user()

    let user = await User.findBy('email', email)

    if (!user) {
      user = await User.create({
        name,
        nickName,
        avatar: avatarUrl,
        email,
        githubId: id,
        type: 'STUDENT',
      })
    } else {
      user.merge({
        name,
        nickName,
        avatar: avatarUrl,
        email,
      })
      await user.save()
    }

    const token = await User.accessTokens.create(user)
    return { token, user }
  }
}
