<template>
  <el-card class="h-full max-h-full overflow-auto">
    <div>
      <el-input v-model="searchForm.product_name" placeholder="请输入商品名称" class="w-96"></el-input>
      <el-select
        v-model="searchForm.language"
        class="m-2"
        placeholder="Select"
        style="width: 240px"
        @change="GetData()"
      >
        <el-option
          v-for="item in languageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
        <el-button @click="$router.push('/home/operate-product')" type="primary">添加</el-button>
    </div>
    <el-table :data="products" style="width: 100%">
      <el-table-column prop="product_name" label="商品名称" width="180" />
      <el-table-column prop="product_type" label="Name" width="180" />
      <el-table-column prop="peculiarity" label="特点" />
      <el-table-column prop="distance" label="安装距离" />
      <el-table-column prop="language" label="语言"></el-table-column>
      <el-table-column width="150" label="创建时间">
        <template #default="scope">
          {{ useDayjsFormateDate().value(scope.row.CreatedAt) }}
        </template>
      </el-table-column>
      <el-table-column width="150" label="更新时间">
        <template #default="scope">
          {{ useDayjsFormateDate().value(scope.row.UpdatedAt) }}
        </template>
      </el-table-column>
      <el-table-column width="180" label="操作">
        <template #default="scope">
          <el-button type="primary" @click="HandlerrEditClick(scope.row)">编辑</el-button>
          <el-popconfirm @confirm="HandlerDeleteClick(scope.row)" title="是否删除该文章">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">
import { DeleteLDSService, FindLDSService } from '@/service'
import { ElMessage } from 'element-plus'
import { reactive, onMounted, ref } from 'vue'
import { useDayjsFormateDate } from '@/hooks'
import { languageOptions } from '@/utils'
import router from '@/router'
const searchForm = reactive({
  language: 'zh',
  product_name: ''
})

const products = ref<any[]>([])
function HandlerDeleteClick(row: any) {
  console.log('first 删除', row, row.ID)
  DeleteLDSService(row).then(res => {
    ElMessage({
      type: res.code == 1 ? 'error' : 'success',
      message: res.msg
    })
    if (res.code == 1) return
    GetData()
  })
}
function GetData() {
  FindLDSService(searchForm).then((res) => {
    console.log('first => ', res)
    ElMessage({
      type: res.code == 1 ? 'error' : 'success',
      message: res.msg
    })
    if (res.code == 1) return
    products.value = res.data
  })
}
const HandlerrEditClick = (row: any) => {
  router.push('/home/operate-product?id=' + row.ID)
}
onMounted(() => {
  GetData()
})
</script>

<style scoped></style>
