<template>
  <el-container class="h-screen">
    <el-header style="padding: 0">
      <nav-header />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <nav-aside></nav-aside>
      </el-aside>
      <el-main style="padding: 10px; background-size: 100% 100%; background-image: url('https://lianghj.top/api/uploads/84579300-abf0-5870-9d4b-e522470aff0a.png');"><RouterView /></el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import NavHeader from '@/components/header/nav-header.vue'
import NavAside from '@/components/nav-aside/index.vue'
</script>
<style scoped></style>
