import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'
import Permission from './Permission'
import Account from './Account'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public slug: string

  @column()
  public power: number

  @manyToMany(() => Account)
  public accounts: ManyToMany<typeof Account>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Role) {
    model.id = randomUUID()
  }
}
