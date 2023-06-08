import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { randomUUID } from 'crypto'
import Role from './Role'
import Permission from './Permission'
import User from './User'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @hasOne(() => User)
  public user: HasOne<typeof User>

  @manyToMany(() => Role)
  public roles: ManyToMany<typeof Role>

  @manyToMany(() => Permission)
  public permissions: ManyToMany<typeof Permission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid (model: Account) {
    model.id = randomUUID()
  }
}
