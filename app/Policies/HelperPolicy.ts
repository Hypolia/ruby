import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Account from 'App/Models/Account'
import Role from 'App/Models/Role'

export default class HelperPolicy extends BasePolicy {
  public async before (account: Account | null): Promise<true | undefined> {
    if (account) {
      const permissions = await HelperPolicy.getPermissions(account)

      if (permissions.includes('administrateur')) return true
    }
  }

  public static async getPermissions (account: Account): Promise<string[]> {
    await account.load('permissions')
    await account.load('roles', (query) => query.preload('permissions'))

    const permissions: string[] = account.permissions.map((permission) => permission.identifier)

    account.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        if (!permissions.includes(permission.identifier)) {
          permissions.push(permission.identifier)
        }
      })
    })

    return permissions
  }

  public static async getMaxRole (account: Account): Promise<Role> {
    await account.load('roles')

    const max: number = Math.max(...account.roles.map((role) => role.power))

    return account.roles.find((role) => role.power === max)!
  }
}
