<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="h-full"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    router
  >
    <el-menu-item index="/home/user">
      <el-icon><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="/home/article">
      <el-icon><Document /></el-icon>
      <span>文章管理</span>
    </el-menu-item>
    <el-menu-item index="/home/product">
      <el-icon><ShoppingCart /></el-icon>
      <span>商品管理</span>
    </el-menu-item>
    <el-menu-item index="/home/file">
      <el-icon><Folder /></el-icon>
      <span>文件管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped></style>
