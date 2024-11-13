import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { randomUUID } from 'node:crypto'
import Classroom from './classroom.js'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare instructions: string

  @column()
  declare expected: string

  @column()
  declare language: string

  @column()
  declare authorId: string

  @hasOne(() => User, {
    foreignKey: 'authorId',
  })
  declare author: HasOne<typeof User>

  @manyToMany(() => Classroom, { pivotTable: 'classroom_exercises' })
  declare classrooms: ManyToMany<typeof Classroom>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(model: Exercise) {
    model.id = randomUUID()
  }
}
