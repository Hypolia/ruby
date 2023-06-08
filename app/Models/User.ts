import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import { randomUUID } from 'crypto'
import Account from './Account'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column()
  public password: string

  @column()
  public accountId: string
  
  @belongsTo(() => Account)
  public account: BelongsTo<typeof Account>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (model: User) {
    if (model.$dirty.password) {
      model.password = await Hash.make(model.password)
    }
  }

  @beforeCreate()
  public static async generateUuid (model: User) {
    model.id = randomUUID()
  }
}
