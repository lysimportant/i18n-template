<template>
  <el-card class="h-full max-h-full overflow-auto">
    <div>
      <el-input v-model="articleInfo.title" placeholder="请输入搜索的标题" class="w-96"></el-input>
      <el-select
        v-model="articleInfo.language"
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
      <el-button @click="GetData()" type="success">搜索</el-button>
      <el-button
        @click="(articleInfo.title = ''), (articleInfo.language = 'zh'), GetData()"
        type="primary"
        >重置</el-button
      >
      <el-button type="primary" @click="router.push('/home/operate-article')">添加</el-button>
    </div>
    <el-table :data="articles" style="width: 100%">
      <el-table-column prop="title" label="标题" width="220" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="language" label="语言" width="100" />
      <el-table-column width="150" prop="author" label="创建人" />
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
      <el-table-column width="180" prop="author" label="创建人">
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
import { DeleteArticleService, FindArticleService } from '@/service'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useDayjsFormateDate } from '@/hooks'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { languageOptions } from '@/utils'
const router = useRouter()
const articleInfo = reactive({
  language: 'zh',
  title: '',
  id: ''
})

const GetData = async () => {
  const res = await FindArticleService(articleInfo)
  articles.value = res.data
  ElMessage({
    type: res.code == 0 ? 'success' : 'error',
    message: res.msg
  })
}
const articles = ref<any[]>([])

const HandlerrEditClick = (row: any) => {
  router.push('/home/operate-article?id=' + row.ID)
}
const HandlerDeleteClick = (row: any) => {
  DeleteArticleService({ id: row.ID }).then(async (res) => {
    if (res.code == 1) {
      ElMessage({
        type: 'error',
        message: res.msg
      })
      return
    }
    ElMessage({
      type: 'success',
      message: res.msg
    })
    await GetData()
  })
}

function KeyDown(event: KeyboardEvent) {
  if (event.code == 'Enter') {
    GetData()
  }
}
onMounted(() => {
  GetData()
  window.addEventListener('keydown', KeyDown)
})
onUnmounted(() => {
  window.removeEventListener('keydown', KeyDown)
})
</script>

<style scoped></style>
