import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import { StoreValidator, UpdateValidator } from 'App/Validators/RoleValidator'

export default class RolesController {
  public async index ({ bouncer, response }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')

    const roles = await Role.query()

    return response.send({
      roles,
      length: roles.length
    })
  }

  public async show ({ bouncer, response, params }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('view')

    const role = await Role.findOrFail(params.id)
    await role.load('permissions')
    await role.load('accounts')

    return response.send({
      role
    })
  }

  public async store ({ bouncer, response, request }: HttpContextContract) {
    await bouncer.with('RolePolicy').authorize('store')
    const data = await request.validate(StoreValidator)

    const role = await Role.create(data)

    return response.send({
      message: 'Role was been created',
      role
    })
  }

  public async update ({ bouncer, response, params, request }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await bouncer.with('RolePolicy').authorize('update', role)

    const data = await request.validate(UpdateValidator)
    await role.merge(data).save()

    return response.send({
      message: 'Role was been updated',
      role
    })
  }

  public async destroy ({ bouncer, response, params }: HttpContextContract) {
    const role = await Role.findOrFail(params.id)
    await bouncer.with('RolePolicy').authorize('delete', role)

    await role.delete()

    return response.send({
      message: 'Role was been deleted',
      role
    })
  }
}
