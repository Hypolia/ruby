import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Guest {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    if (auth.isAuthenticated) return false
    await next()
  }
}
