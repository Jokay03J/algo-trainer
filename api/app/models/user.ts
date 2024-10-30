import { DateTime } from 'luxon'
// import hash from '@adonisjs/core/services/hash'
// import { compose } from '@adonisjs/core/helpers'
// import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { BaseModel, beforeCreate, column, manyToMany } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { randomUUID } from 'node:crypto'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Classroom from '#models/classroom'

// const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
//   uids: ['id'],
//   passwordColumnName: 'password',
// })

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare nickName: string

  @column()
  declare email: string

  @column()
  declare avatar: string

  @column()
  declare githubId: string

  @column()
  declare type: 'TEACHER' | 'STUDENT'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @manyToMany(() => Classroom)
  declare classrooms: ManyToMany<typeof Classroom>

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @beforeCreate()
  public static async createUUID(model: User) {
    model.id = randomUUID()
  }
}
