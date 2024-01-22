<template>
  <el-card class="bg-opacity-45 h-full max-h-full overflow-auto">
    <el-row>
      <el-col :span="8">
        <el-input v-model="userInfo.username" placeholder="请输入帐号名称"></el-input>
      </el-col>
      <el-col class="text-center" :span="4">
        <el-button type="success" @click="GetData(userInfo.username)">搜索</el-button>
        <el-button
          type="primary"
          @click="GetData(), (userInfo.username = ''), HandlerDialogCloseIng()"
          >重置</el-button
        >
        <el-button type="primary" @click="(dialogInfo.title = '添加'), (dialogInfo.dislog = true)"
          >添加</el-button
        >
      </el-col>
    </el-row>
    <el-table class="mt-2" :data="userStore.users" style="width: 100%">
      <el-table-column prop="ID" label="ID" />
      <el-table-column prop="username" label="帐号名称" />
      <el-table-column prop="mobile" label="手机号码" />
      <el-table-column label="创建时间">
        <template #default="scope">
          {{  useDayjsFormateDate().value(scope.row.CreatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="更新时间">
        <template #default="scope">
          {{ useDayjsFormateDate().value(scope.row.UpdatedAt) }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scpoe">
          <el-button type="primary" size="small" @click="HandlerEditUser(scpoe.row)"
            >编辑</el-button
          >
          <el-popconfirm
            @confirm="HandlerDeleteUserClick(scpoe.row)"
            :title="`确定删除${scpoe.row.username}吗?`"
          >
            <template #reference>
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog
    destroy-on-close
    v-model="dialogInfo.dislog"
    :title="`用户${dialogInfo.title}`"
    width="30%"
    @close="HandlerDialogCloseIng"
  >
    <div>
      帐号:
      <el-input
        :placeholder="`请输入${dialogInfo.title}帐号`"
        v-model="userInfo.username"
      ></el-input>
    </div>
    <div>
      密码:
      <el-input
        :placeholder="`请输入${dialogInfo.title}密码`"
        v-model="userInfo.password"
      ></el-input>
    </div>
    <div>
      手机:
      <el-input :placeholder="`请输入${dialogInfo.title}手机`" v-model="userInfo.mobile"></el-input>
    </div>
    <!-- <div>
      手机号码:
      <el-input v-model=""></el-input>
    </div> -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="HandlerDialogCloseIng">Cancel</el-button>
        <el-button type="primary" @click="HandlerAddUserClick"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {
  DeleteUserService,
  GetUserAndListservice,
  PatchUserService,
  PostUserService
} from '@/service'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { onMounted, onUnmounted, reactive } from 'vue'
import { useDayjsFormateDate } from "@/hooks"
import router from '@/router'
const userInfo = reactive({
  username: '',
  password: '',
  mobile: '',
  id: 0
})
type IUserInfo = typeof userInfo
const dialogInfo = reactive({
  dislog: false,
  title: ''
})
const userStore = useUserStore()


// 处理用户删除
const HandlerDeleteUserClick = (payload: any) => {
  DeleteUserService(payload).then((res) => {
    ElMessage({
      type: res.code == 0 ? 'success' : 'error',
      message: res.msg
    })
    if (res.code == 1) return
    GetData()
  })
}

// Dialog关闭清除数据
const HandlerDialogCloseIng = () => {
  userInfo.username = ''
  userInfo.password = ''
  userInfo.mobile = ''
  dialogInfo.dislog = false
}

// 编辑用户打开
const HandlerEditUser = (payload: any) => {
  userInfo.username = payload.username
  userInfo.mobile = payload.mobile
  userInfo.id = payload.ID
  dialogInfo.title = '编辑'
  dialogInfo.dislog = true
}

const HandlerAddUserClick = () => {
  for (const key in userInfo) {
    if (Object.prototype.hasOwnProperty.call(userInfo, key)) {
      if (key != 'password' && key != 'id' && userInfo[key as keyof IUserInfo] == '') {
        ElMessage({
          type: 'warning',
          message: '请把信息填写完整'
        })
        return
      }
    }
  }
  const regex = /^1[3-9]\d{9}$/
  if (!regex.test(userInfo.mobile)) {
    ElMessage({
      type: 'warning',
      message: '请输入正确的11位手机号'
    })
    return
  }
  if (dialogInfo.title == '添加') {
    PostUserService(userInfo).then((res) => {
      ElMessage({
        type: res.code == 0 ? 'success' : 'error',
        message: res.msg
      })
      dialogInfo.dislog = false
      GetData()
    })
  } else {
    PatchUserService(userInfo).then((res) => {
      ElMessage({
        type: res.code == 0 ? 'success' : 'error',
        message: res.msg
      })
      if (res.data) {
        router.push('/login')
        return
      }
      dialogInfo.dislog = false
      GetData()
    })
  }
}

// 获取数据
function GetData(username = '') {
  GetUserAndListservice({ username }).then((res) => {
    if (username == '') {
      userStore.users = res.data
      localStorage.setItem('i18n_template_users', JSON.stringify(res.data))
    } else {
      userStore.users = res.data
    }
    ElMessage({
      type: 'success',
      message: res.msg
    })
  })
}
function KeyDown(event: KeyboardEvent) {
  if (event.code == "Enter") {
    GetData(userInfo.username)
  }
}
onMounted(() => {
  GetData()
  window.addEventListener("keydown", KeyDown)
})
onUnmounted(() => {
  window.removeEventListener("keydown", KeyDown)
})
</script>

<style scoped></style>
