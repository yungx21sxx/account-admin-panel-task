export type AccountType = 'LDAP' | 'LOCAL';

export interface IAccount {
  id: string;
  labels: Array<{ text: string }>;
  type: AccountType | null;
  login: string;
  password: string | null;
  empty: boolean
}
