import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary()
      table.string('name')
      table.string('nick_name')
      table.string('email', 254).notNullable().unique()
      table.string('avatar')
      table.string('github_id')
      table.enum('type', ['STUDENT', 'TEACHER'])

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
