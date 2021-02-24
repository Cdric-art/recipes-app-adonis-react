import {rules, schema} from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export type RecipeData = RecipeValidator['schema']['props']

export default class RecipeValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    title: schema.string({}, [
      rules.unique({
        table: 'recipes',
        column: 'title',
        whereNot: this.ctx.params.id ? {id: this.ctx.params.id} : undefined,
      }),
    ]),
    short: schema.string.optional(),
    content: schema.string(),
    ingredients : schema.array().members(
      schema.object().members({
        id: schema.number([rules.exists({table: 'ingredients', column: 'id'})]),
        quantity: schema.number(),
      }),
    ),
  })

  public messages = {}
}
