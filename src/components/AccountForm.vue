<script setup lang="ts">
import type {IAccount, AccountType} from "@/types/account";
import {mdiEye, mdiEyeOff, mdiTrashCan} from "@mdi/js";
import {reactive, ref, watch} from "vue";
import {useAccounts} from "@/composable/useAccounts.ts";

const {parseLabels} = useAccounts()

const props = defineProps<{
  account: IAccount
}>()

const emit = defineEmits<{
  (e: 'update', value: IAccount): void
  (e: 'remove', id: string): void
}>()

const required = (field: string) => (v: any) => !!v || `Поле «${field}» обязательно для заполнения`;
const maxLength = (field: string, len: number) => (v: any) =>
  !v || v.length <= len || `Поле «${field}» не должно превышать ${len} символов`;

const labelRules = [
  required('Метки'),
  maxLength('Метки', 50),
]

const loginRules = [
  required('Логин'),
  maxLength('Логин', 100),
]

const passwordRules = [
  required('Пароль'),
  maxLength('Пароль', 100),
]

const formRef = ref()
const localAccount = reactive({...props.account})

const selectOptions: {text: string, value: AccountType}[] = [
  {
    text: 'Локальная',
    value: 'LOCAL'
  },
  {
    text: 'LDAP',
    value: 'LDAP'
  },
];

const showPassword = ref(false);

const localLabels = ref(localAccount.labels.map(label => label.text).join('; '))

watch([localAccount, localLabels], async () => {
  if (!formRef.value?.validate) return;
  const { valid } = await formRef.value.validate()
  if (!valid) return;

  const {password, labels, empty, ...acountData} = localAccount;

  emit('update', {
    password: localAccount.type === 'LDAP' ? null : password,
    labels: parseLabels(localLabels.value),
    empty: false,
    ...acountData
  })

},{
  deep: true,
  immediate: true
})

const removeAccount = () => emit('remove', localAccount.id)


</script>

<template>
  <v-form
    :class="['form', { 'login-only': localAccount.type === 'LDAP' }]"
    validate-on="input"
    fast-fail
    ref="formRef"
  >
    <v-text-field
      label="Метки"
      v-model="localLabels"
      :counter="50"
    />

    <v-select
      label="Тип записи"
      :items="selectOptions"
      v-model="localAccount.type"
      item-value="value"
      item-title="text"
      :rules="[required('Тип записи')]"
    />

    <v-text-field
      label="Логин"
      v-model="localAccount.login"
      :rules="loginRules"
      :counter="100"
    />

    <v-text-field
      v-if="localAccount.type !== 'LDAP'"
      label="Пароль"
      v-model="localAccount.password"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? mdiEye : mdiEyeOff"
      @click:append="showPassword = !showPassword"
      :rules="passwordRules"
      :counter="100"
    />

    <v-btn
      color="red"
      variant="tonal"
      :icon="mdiTrashCan"
      @click="removeAccount"
    />
  </v-form>
</template>

<style scoped lang="sass">

.form
  display: grid
  grid-template-columns: 1.5fr 1fr 1.5fr 1.5fr 48px

  > * + *
    margin-left: 24px

  &.login-only
    grid-template-columns: 1.5fr 1fr 3fr 48px

</style>
