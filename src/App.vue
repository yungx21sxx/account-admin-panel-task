<template>
  <v-app>
    <v-main>
      <div class="wrapper">
        <HeaderBar/>
        <AccountList/>
      </div>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HeaderBar from "@/components/HeaderBar.vue";
import AccountList from "@/components/AccountList.vue";
</script>
