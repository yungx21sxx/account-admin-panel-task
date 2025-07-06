import { defineStore } from 'pinia'
import type { IAccount } from '@/types/account'

export const mockAccounts: IAccount[] = [
  {
    id: '1',
    labels: [{ text: 'admin' }, { text: 'prod' }],
    type: 'LOCAL',
    login: 'admin_user',
    password: 'securePass123',
    empty: false
  },
  {
    id: '2',
    labels: [{ text: 'dev' }],
    type: 'LDAP',
    login: 'j.smith',
    password: null,
    empty: false
  },
  {
    id: '3',
    labels: [{ text: 'test' }, { text: 'backup' }],
    type: 'LOCAL',
    login: 'tester_01',
    password: 'testPass!',
    empty: false
  },
  {
    id: '4',
    labels: [],
    type: 'LOCAL',
    login: 'user123',
    password: 'mypassword',
    empty: false
  },
]

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: mockAccounts as IAccount[]
  }),
  persist: {
    key: 'accounts',
    storage: localStorage,
    paths: ['accounts']
  },
  actions: {
    addAccount(account: IAccount) {
      this.accounts.push(account)
    },

    removeAccount(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id)
    },

    updateAccount(updated: IAccount) {
      const index = this.accounts.findIndex(acc => acc.id === updated.id)
      if (index !== -1) {
        Object.assign(this.accounts[index], updated)
      }
    }
  }
})
