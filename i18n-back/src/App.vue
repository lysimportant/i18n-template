<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useUserStore } from './stores';
const userStore = useUserStore()
onMounted(() => {
  const info = localStorage.getItem("i18n_template_userinfo")
  const us = localStorage.getItem("i18n_template_users")
  us !== null && (userStore.users = JSON.parse(us) )
  info !== null && (userStore.user = JSON.parse(info))
})

</script>
<template>
  <RouterView />
</template>

<style scoped></style>
