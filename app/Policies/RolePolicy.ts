import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Account from 'App/Models/Account'
import Role from 'App/Models/Role'
import HelperPolicy from './HelperPolicy'

export default class RolePolicy extends BasePolicy {
	public async before (account: Account) {
		const permissions: string[] = await HelperPolicy.getPermissions(account)
    if (permissions.includes('admin')) return true
	}

	public async view (account: Account) {
    const permissions: string[] = await HelperPolicy.getPermissions(account)
		return permissions.includes('view:role')
			|| permissions.includes('store:role')
			|| permissions.includes('update:role')
			|| permissions.includes('delete:role')
  }

	public async store (account: Account) {
    const permissions: string[] = await HelperPolicy.getPermissions(account)
		return permissions.includes('store:role')
  }

	public async update (account: Account, role: Role) {
    const permissions: string[] = await HelperPolicy.getPermissions(account)
		const accountRole = await HelperPolicy.getMaxRole(account)

		if (accountRole.power <= role.power) return false

		return permissions.includes('update:role')
  }

	public async delete (account: Account, role: Role) {
    const permissions: string[] = await HelperPolicy.getPermissions(account)
		const accountRole = await HelperPolicy.getMaxRole(account)

		if (accountRole.power <= role.power) return false

		return permissions.includes('destroy:role')
  }
}
