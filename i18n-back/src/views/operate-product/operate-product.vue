<template>
  <el-card>
    <el-row :gutter="24">
      <el-col :sm="12" :md="8" :lg="6" class="mt-1">
        <span>语言</span>
        <el-select
          v-model="language"
          class="w-full"
          placeholder="请选择语言"
        >
          <el-option
            v-for="item in languageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
      <template v-for="(value, key, index) in productInfo" :key="index">
        <!-- <div>{{key}}</div> -->
        <el-col :sm="12" :md="8" :lg="6" class="mt-1" v-if="key === 'product_type'">
          <span>{{ objKey[key] }}</span>
          <el-select class="w-full" v-model="productInfo[key]" :placeholder="`选择入${objKey[key]}`">
            <el-option
              v-for="item in returnOptions()"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col v-else :sm="12" :md="8" :lg="6" class="mt-1">
          <span>{{ objKey[key] }}</span>
          <el-input v-model="productInfo[key]" :placeholder="`请输入${objKey[key]}`"></el-input>
        </el-col>
      </template>
      <el-col :sm="12" :md="8" :lg="6" class="mt-1 flex  justify-end flex-col">
        <el-button v-if="route.query.id" @click="HandlerUpdateClick" class=" w-20" type="primary">更新</el-button>
        <el-button v-else @click="HandlerAddProductClick" class=" w-20" type="primary">添加</el-button>
      </el-col>
    </el-row>

    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      mode="default"
    />
    <Editor
      style="height: 600px; overflow-y: hidden"
      v-model="richContent"
      :defaultConfig="editorConfig"
      mode="default"
      @onCreated="handleCreated"
    />
  </el-card>
</template>

<script setup lang="ts">
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { languageOptions } from '@/utils'
import { shallowRef, ref, onBeforeUnmount, reactive, onMounted } from 'vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { useRoute } from 'vue-router'
import { FindLDSService, GenerateLDSService, PatchLDSService } from '@/service'
import { ElMessage } from 'element-plus'
import router from '@/router'
const editorRef = shallowRef()
const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }
const route = useRoute()
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
function returnOptions() {
  if(language.value == "zh") {
    return [{
      label: "激光位移传感器",
      value: "激光位移传感器"
    },{
      label:  "激光轮廓传感器",
      value:  "激光轮廓传感器"
    }]
  } else if(language.value == "en") {
    return [
      {
        label: "Laser Displacement Sensor",
        value: "Laser Displacement Sensor"
      },
      {
        label: "Laser Profiling Sensor",
        value: "Laser Profiling Sensor"
      }
    ]
  } else if(language.value == "ru") {
    return [
      {
        label: "Лазерный датчик перемещения",
        value: "Лазерный датчик перемещения"
      },
      {
        label: "Лазерный датчик профиля",
        value: "Лазерный датчик профиля"
      }
    ]
  } else {
    return []
  }
}
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
const richContent = ref(null)
const language = ref("")
const productInfo = reactive({
  product_type: '',
  product_name: '',
  peculiarity: '',
  distance: '',
  height_range: '',
  repeatability: '',
  linear_accuracy: '',
  sampling_period: '',
  wavelength: ''
})
const objKey: any = {
  product_name: '商品名字',
  product_type: '商品类型',
  peculiarity: '特点',
  distance: '安装距离',
  height_range: '测试高度范围',
  repeatability: '重复精度',
  linear_accuracy: '线性精度',
  sampling_period: '采样周期',
  wavelength: '激光波长'
}

function response(res: any) {
  ElMessage({
      type: res.code == 1 ? "error" : "success",
      message: res.msg
    })
    if(res.code == 1)return;
    router.back()
}
function HandlerAddProductClick() {
  GenerateLDSService({
    ...productInfo,
    language: language.value,
    content: richContent.value
  }).then(res =>  response(res))
}
function HandlerUpdateClick() {
  PatchLDSService( {
    ...productInfo,
    language: language.value,
    content: richContent.value
  }).then(res => response(res))
  console.log("=> -- ", {
    ...productInfo,
    language: language.value,
    content: richContent.value
  });
  
}
onMounted(() => {
  if(route.query.id){
    FindLDSService({id: route.query.id}).then(res => {
      ElMessage({
        type: res.code == 1 ? "error" : "success",
        message: res.msg
      })
      const data = res.data[0]
      language.value = data.language
      richContent.value = data.content
      productInfo.distance = data.distance
      productInfo.height_range = data.height_range
      productInfo.linear_accuracy = data.linear_accuracy
      productInfo.product_name = data.product_name
      productInfo.product_type = data.product_type
      productInfo.repeatability = data.repeatability
      productInfo.sampling_period = data.sampling_period
      productInfo.wavelength = data.wavelength
      productInfo.peculiarity = data.peculiarity
    })
  }
  // 请求数据
  console.log('first -> ', route)
})
</script>
