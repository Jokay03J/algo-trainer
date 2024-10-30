import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { randomUUID } from 'node:crypto'
import User from './user.js'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Classroom extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare authorId: string

  @hasOne(() => User, { localKey: 'authorId', foreignKey: 'id' })
  declare author: HasOne<typeof User>

  @manyToMany(() => User)
  declare students: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(model: Classroom) {
    model.id = randomUUID()
  }
}
