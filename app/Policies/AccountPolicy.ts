import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import Account from 'App/Models/Account'
import HelperPolicy from './HelperPolicy'

export default class AccountPolicy extends BasePolicy {
	public async before (account: Account) {
		const permissions: string[] = await HelperPolicy.getPermissions(account)
		if (permissions.includes('admin')) return true
	  }
	

	public async view (account: Account) {
		const permissions: string[] = await HelperPolicy.getPermissions(account)
		return permissions.includes('view:account')
			|| permissions.includes('store:account')
			|| permissions.includes('update:account')
			|| permissions.includes('delete:account')
	}

	public async store (account: Account) {
		const permissions: string[] = await HelperPolicy.getPermissions(account)
		return permissions.includes('store:account')
	}

	public async update(account: Account, currentAccount: Account) {
		const permissions: string[] = await HelperPolicy.getPermissions(account)
		const currentAccountRole = await HelperPolicy.getMaxRole(currentAccount)
		const accountRole = await HelperPolicy.getMaxRole(account)

		if (accountRole.power <= currentAccountRole.power) return false

		return permissions.includes('update:account')
	}

	public async delete(account: Account, currentAccount: Account) {
		const permissions: string[] = await HelperPolicy.getPermissions(account)
		const currentAccountRole = await HelperPolicy.getMaxRole(currentAccount)
		const accountRole = await HelperPolicy.getMaxRole(account)

		if (accountRole.power <= currentAccountRole.power) return false

		return permissions.includes('destroy:account')
	}
}
