import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class IngredientValidator {
  constructor (protected ctx: HttpContextContract) {
  }

  public schema = schema.create({
    title: schema.string(),
    unit: schema.string.optional(),
  })

  public messages = {}
}
