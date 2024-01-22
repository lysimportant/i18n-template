<template>
  <div class="h-full shadow-md leading-[60px] flex items-center justify-between px-2">
    <div class="flex items-center w-2/4">
      <img
        class="h-full w-16 mx-16"
        src="https://lianghj.top/api/uploads/cb71807a-3de1-5e0c-a98b-5cbef3310f80.bmp"
      />
      <el-icon @click="router.back()" class="cursor-pointer block text-2xl"
        ><Back class="text-2xl"
      /></el-icon>
    </div>
    <div class="w-1/4 text-right flex  items-center justify-end">
      <el-dropdown :hide-on-click="false">
        <span class="text-black text-xl">
          {{ userStore.user.username }}
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/login')">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
console.log('first =? ', userStore)
</script>

<style></style>
