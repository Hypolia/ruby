import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Account from 'App/Models/Account'
import { StoreValidator, UpdateValidator } from 'App/Validators/AccountValidator'

export default class AccountsController {
    public async index ({ bouncer, response }: HttpContextContract): Promise<void> {
      await bouncer.with('AccountPolicy').authorize('view')
      const accounts = await Account.query()
      return response.send({
        length: accounts.length,
        accounts,
      }, true)
    }

    public async show ({ bouncer, response, params }: HttpContextContract): Promise<void> {
      await bouncer.with('AccountPolicy').authorize('view')
      const account = await Account.findOrFail(params.id)
      
      await account.load('user')
      await account.load('permissions')
      await account.load('roles', (query) => query.preload('permissions'))

      return response.send({
        account
      })
    }

    public async store ({ bouncer, response, request }: HttpContextContract): Promise<void> {
      await bouncer.with('AccountPolicy').authorize('store')
      const data = await request.validate(StoreValidator)

      const account = await Account.create(data)

      return response.send({
        account
      })
    }

    public async update ({ bouncer, response, request, params }: HttpContextContract): Promise<void> {
      const account = await Account.findOrFail(params.id)
      await bouncer.with('AccountPolicy').authorize('update', account)

      const data = await request.validate(UpdateValidator)

      await account.merge(data).save()
    }

    public async destroy ({ bouncer, response, params }: HttpContextContract): Promise<void> {
      const account = await Account.findOrFail(params.id)
      await bouncer.with('AccountPolicy').authorize('delete', account)

      await account.delete()

      return response.send({
        message: 'Account was been deleted',
        account
      })
    }
}
