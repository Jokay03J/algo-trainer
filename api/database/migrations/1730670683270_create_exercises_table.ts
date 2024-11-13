import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'exercises'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').unique().primary()
      table.string('name', 255)
      table.string('instructions')
      table.string('expected')
      table.string('language')
      table.uuid('author_id').references('users.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
