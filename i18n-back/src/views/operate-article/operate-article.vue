<template>
  <el-card>
    <el-collapse v-model="Testarr">
      <el-collapse-item  name="1" title="文章发布">
        <el-input v-model="articleInfo.title" style="min-width: 240px" placeholder="请输入文章的标题"></el-input>
        <el-input v-model="articleInfo.description" style="margin: 2px 0;min-width: 240px" placeholder="请输入文章的描述"></el-input>
        <el-select
        v-model="articleInfo.language"
        placeholder="请选择文章的语言"
        style="width: 240px"
      >
        <el-option
          v-for="item in languageOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button v-if="route.query.id" @click="HandlerPatchArticleClick">更新</el-button>
      <el-button v-else @click="HandlerGenerateArticleClick">发布</el-button>
      </el-collapse-item>
    </el-collapse>
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 600px; overflow-y: hidden"
      v-model="articleInfo.content"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </el-card>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { languageOptions } from '@/utils';
import { shallowRef, ref, onBeforeUnmount, reactive, onMounted } from "vue"
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { FindArticleService, GenerateArticleService, PatchArticleService } from '@/service';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useRoute } from 'vue-router';
const route = useRoute()
const Testarr =ref(["1"])
const articleInfo = reactive({
  language: "",
  title: "",
  description: "",
  content: "",
  id: null
})
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const mode = ref("simple")
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
function resopnse(res: any) {
  ElMessage({
      type: res.code == 0 ? "success" : "error",
      message: res.msg
    })
    router.back()
}
const HandlerGenerateArticleClick = () => {
  GenerateArticleService(articleInfo).then(res => resopnse(res))
}
const HandlerPatchArticleClick = () => {
  PatchArticleService(articleInfo).then((res) => resopnse(res))
}
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
onMounted(() => {
  if(route.query.id){
    FindArticleService({id: route.query.id}).then((res) => {
      articleInfo.title = res.data.title
      articleInfo.description = res.data.description
      articleInfo.language = res.data.language
      articleInfo.content = res.data.content
      articleInfo.id = res.data.ID
    })
  }
})
</script>

<style scoped></style>
