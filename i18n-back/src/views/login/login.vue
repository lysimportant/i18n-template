<template>
  <div class="login_container">
    <!-- style="width: 640px; height: 384px;" -->
    <div
      class="sm:w-screen md:w-1/2 lg:w-1/3 sm:h-64 md:h-96 box rounded-lg overflow-hidden flex absolute shadow-lg top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white"
    >
      <div
        style="backgroundcolor: rgb(237, 212, 220)"
        class="left relative z-10 flex-1 shadow-2xl items-center flex justify-center flex-col gap-2"
      >
        <h1 class="text-pink-400/80 font-bold text-xl">欢迎登录 i18n Back</h1>
        <img
          class="w-28 h-28 rounded-full"
          src="https://lianghj.top/api/uploads/cb71807a-3de1-5e0c-a98b-5cbef3310f80.bmp"
          alt=""
        />
      </div>
      <div class="right flex-1 bg-blue-200/40 flex justify-center items-center">
        <div class="w-52 h-44">
          <h1 class="flex justify-center font-bold text-2xl text-blue-500">
            L O G I N
            <svg
              t="1704934827445"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="880"
              width="30"
              height="30"
            >
              <path
                d="M828.243571 399.48032c-53.308113-17.953907-123.57855-12.361539-184.40387 0.499373 54.736649-28.269857 111.898533-67.785849 141.532457-114.818025 0 0 53.308113-69.214385-22.799262-130.536009 0 0-39.143509-33.242102-83.938738-14.476713l0-0.372483c-26.842345 8.760524-35.103496-16.71366-35.103496-16.71366l-0.187265 0.12382c-13.729699-46.475498-64.181765-55.917544-64.181765-55.917544-95.616708-20.38119-115.747187 64.553225-115.747187 64.553225-18.080797 53.305043-12.364609 123.638925 0.432859 184.4008-28.266787-54.736649-67.782779-111.834065-114.814955-141.469012 0 0-69.152986-53.308113-130.539079 22.802332 0 0-33.239032 39.080064-14.537088 83.875293l-0.312108 0c8.760524 26.90272-16.71366 35.166941-16.71366 35.166941l0.12689 0.184195c-46.475498 13.732769-55.920614 64.181765-55.920614 64.181765-20.37812 95.619778 64.617693 115.750257 64.617693 115.750257 53.308113 18.017352 123.57855 12.361539 184.340425-0.499373-54.736649 28.334325-111.834065 67.849294-141.532457 114.88147 0 0-53.244668 69.214385 22.862707 130.536009 0 0 39.143509 33.239032 83.938738 14.537088l0 0.24764c26.842345-8.697079 35.103496 16.71366 35.103496 16.71366l0.188288-0.12382c13.729699 46.535873 64.180741 55.980989 64.180741 55.980989 95.616708 20.317745 115.747187-64.617693 115.747187-64.617693 9.632381-28.64234 12.364609-62.130036 10.937097-96.42512 18.949584 80.395028 68.590168 186.640818 199.99701 213.294874l41.875736-31.502481-18.886139-67.037812c0 0-140.29221-24.790616-187.94451-127.987976 20.314675 27.02654 43.240827 50.884924 68.402903 66.790172 0 0 69.214385 53.308113 130.539079-22.802332 0 0 33.239032-39.143509 14.537088-83.938738l0.312108 0c-8.760524-26.839275 16.71059-35.103496 16.71059-35.103496l-0.184195-0.187265c46.535873-13.729699 55.980989-64.178695 55.980989-64.178695C913.239384 419.6108 828.243571 399.48032 828.243571 399.48032z"
                fill="#49d50c"
                p-id="881"
              ></path>
            </svg>
          </h1>
          <el-input
            v-model="loginForm.username"
            placeholder="请输入帐号"
            class="mt-1"
            focus
          ></el-input>
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            class="mt-1"
            show-password
          ></el-input>
          <el-button @click="HandlerLoginClick" type="primary" class="mt-1">登录</el-button>
          <el-checkbox
            size="large"
            @change="HandlerSavePasClick"
            v-model="isCheck"
            type="primary"
            class="float-right"
          >
            帐号密码
          </el-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { UserLoginService } from '@/service'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { useDayjsFormateDate } from '@/hooks'
interface ILoginInfo {
  username: string
  password: string
}
const router = useRouter()
const userStore = useUserStore()
const isCheck = ref(false)
const loginForm = reactive<ILoginInfo>({
  username: '',
  password: ''
})

const HandlerLoginClick = () => {
  if (loginForm.password == '' || loginForm.username == '') {
    ElMessage({
      message: '请填写完整的信息再进行登录',
      type: 'warning'
    })
    return
  }
  UserLoginService(loginForm)
    .then((res) => {
      if (res.code == 1) {
        ElMessage({
          message: res.msg,
          type: 'error'
        })
        return
      }
      ElMessage({
        message: res.msg,
        type: 'success'
      })
      userStore.user = res.data
      localStorage.setItem('i18n_template_userinfo', JSON.stringify(res.data))
      router.push('/home')
    })
    .catch(() => {
      ElMessage({
        message: '请检查网络或联系管理员',
        type: 'error'
      })
    })
}

const HandlerSavePasClick = (flag: boolean) => {
  if (flag) {
    localStorage.setItem('i18n_login_info', JSON.stringify(loginForm))
  } else {
    localStorage.removeItem('i18n_login_info')
  }
}

onMounted(() => {
  const info = localStorage.getItem('i18n_login_info')
  if (info != null) {
    isCheck.value = true
    loginForm.username = JSON.parse(info).username
    loginForm.password = JSON.parse(info).password
  }
})
</script>

<style scoped>
.login_container {
  height: 100vh;
  background: linear-gradient(to right, #f7d1d7, #bfe3f1);
}
</style>
