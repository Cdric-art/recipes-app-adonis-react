import { DateTime } from 'luxon'
import {BaseModel, column, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Ingredient from 'App/Models/Ingredient'
import {ManyToMany} from '@ioc:Adonis/Lucid/Relations'

export default class Recipe extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public short: string

  @column()
  public content: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Ingredient)
  public ingredients: ManyToMany<typeof Ingredient>
}
