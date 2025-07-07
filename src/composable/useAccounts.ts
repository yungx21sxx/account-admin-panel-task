import { v4 as uuid } from 'uuid';
import type { IAccount } from '@/types/account';

export function useAccounts() {

  function createEmptyAccount(): IAccount {
    return {
      id: uuid(),
      labels: [],
      type: null,
      login: '',
      password: null,
      empty: true
    };
  }

  function parseLabels(input: string): { text: string }[] {
    return input
      .split(';')
      .map(label => label.trim())
      .filter(Boolean)
      .map(text => ({ text }));
  }

  return {
    createEmptyAccount,
    parseLabels,
  };
}
