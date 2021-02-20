import {BaseModel, column, computed, manyToMany, ManyToMany} from '@ioc:Adonis/Lucid/Orm'
import Recipe from 'App/Models/Recipe'
import {DateTime} from 'luxon'

export default class Ingredient extends BaseModel {
  @column({isPrimary: true})
  public id: number

  @column()
  public title: string

  @column()
  public unit?: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @computed()
  public get quantity () {
    return this.$extras.pivot_quantity
  }

  @manyToMany(() => Recipe)
  public recipes: ManyToMany<typeof Recipe>
}
