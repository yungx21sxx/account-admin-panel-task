<script setup lang="ts">
import {mdiPlus} from '@mdi/js'
import {useAccounts} from "@/composable/useAccounts.ts";
import { useAccountsStore} from "@/stores/accounts.ts";

const {createEmptyAccount} = useAccounts();
const store = useAccountsStore();

const addEmptyAccount = () => store.addAccount(createEmptyAccount())

</script>

<template>
  <header class="header">
    <div class="header__top">
      <h1>Учетные записи</h1>
      <v-btn
        color="primary"
        :icon="mdiPlus"
        @click="addEmptyAccount"
      ></v-btn>
    </div>
    <v-alert type="info" variant="tonal" color="tertiary" class="header__alert">
      Для указания нескольких меток для одной пары логин/пароль используйте разделитель;
    </v-alert>
  </header>
</template>

<style scoped lang="sass">

.header
  margin-top: 64px

  &__top
    display: flex
    align-items: center
    gap: 24px

  &__alert
    margin-top: 32px



</style>
