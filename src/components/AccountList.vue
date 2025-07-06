<script setup lang="ts">
import { useAccountsStore} from "@/stores/accounts.ts";
import AccountForm from "@/components/AccountForm.vue";
import type {IAccount} from "@/types/account";
const store = useAccountsStore();

const updateOrCreateAccount = (account: IAccount) => {
  const index = store.accounts.findIndex(acc => acc.id === account.id)
  if (index === -1) {
    store.addAccount(account);
  } else {
    store.updateAccount(account);
  }
}

const removeAccount = (id: string) => {
  const index = store.accounts.findIndex(acc => acc.id === id)
  if (index === -1) return;
  store.removeAccount(id);
}

</script>

<template>
  <div class="accounts">
    <div class="accounts__header account-grid">
      <span>Метки</span>
      <span>Тип записи</span>
      <span>Логин</span>
      <span>Пароль</span>
      <span></span>
    </div>
    <AccountForm
      v-for="account of store.accounts"
      :key="account.id"
      :account="account"
      class="accounts__form"
      @update="updateOrCreateAccount"
      @remove="removeAccount"
    />
  </div>

</template>

<style scoped lang="sass">

.accounts
  margin-top: 48px

  &__header
    font-weight: 500
    margin-bottom: 16px
    display: grid
    grid-template-columns: 1.5fr 1fr 1.5fr 1.5fr 48px

    > * + *
      margin-left: 24px

  &__form
    margin-bottom: 16px

</style>
