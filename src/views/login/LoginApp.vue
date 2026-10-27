<script setup>
import { ref, watch, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { authStore } from '@/stores'
import { authService } from '@/services'
import { demoUsers } from '@/constants'
import { DEMO_PASSWORD } from '@/globalVars'
import LanguageSwitch from '@/components/LanguageSwitch.vue'
import FooterApp from '@/components/FooterApp.vue'

const router = useRouter()
const storeAuth = authStore()
const { t } = useI18n()

const loginElForm = ref()
const loginForm = ref({
  email: '',
  password: '',
})
let loading = ref(false)
const waking = ref(true)

onMounted(() => {
  authService
    .awakeRequest()
    .catch(() => ElMessage.warning(t('login.wakeError')))
    .finally(() => (waking.value = false))
})

const rules = reactive({
  email: [
    {
      required: true,
      message: () => t('login.emailRequired'),
      trigger: 'blur',
      type: 'email',
    },
  ],
  password: [
    {
      required: true,
      message: () => t('login.passwordRequired'),
      trigger: 'blur',
    },
  ],
})

function onSubmit() {
  loginElForm.value.validate(valid => {
    if (valid) {
      loading.value = true
      const body = {
        email: loginForm.value.email,
        password: loginForm.value.password,
      }
      storeAuth.loginRequest(body)
    }
  })
}

function loginAsDemo(email) {
  loginForm.value = { email, password: DEMO_PASSWORD }
  onSubmit()
}

watch(
  () => storeAuth.login,
  value => {
    if (value) {
      setTimeout(() => {
        loading.value = false
        router.push({ path: '/' })
      }, '4000')
    }
  },
)
watch(
  () => storeAuth.error,
  value => {
    if (value) {
      loading.value = false
      ElMessage.error(t('login.invalidCredentials'))
      storeAuth.error = null
    }
  },
)
</script>
<template>
  <div class="login-page">
    <div
      class="container h-100 d-flex align-items-center justify-content-center"
    >
      <div class="row w-100">
        <div class="col-sm-11 col-md-8 col-lg-6 col-xl-5 mx-auto login-col">
          <div class="text-end mb-2">
            <language-switch />
          </div>
          <el-card
            class="login-card"
            shadow="never"
            v-loading="waking"
            :element-loading-text="$t('login.waking')"
            element-loading-background="rgba(255, 255, 255, 0.7)"
          >
            <div class="login-header">
              <div class="login-logo">
                <el-icon :size="28"><box /></el-icon>
              </div>
              <h4 class="mb-0">Inventory</h4>
              <p class="text-muted mb-0">{{ $t('login.title') }}</p>
            </div>
            <el-form
              ref="loginElForm"
              :model="loginForm"
              :rules="rules"
              label-position="top"
              :disabled="waking"
            >
              <el-form-item :label="$t('login.user')" prop="email">
                <el-input
                  v-model="loginForm.email"
                  size="large"
                  prefix-icon="Message"
                />
              </el-form-item>
              <el-form-item :label="$t('login.password')" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  size="large"
                  prefix-icon="Lock"
                  show-password
                  @keyup.enter="onSubmit"
                />
              </el-form-item>
              <el-form-item class="mt-4">
                <el-button
                  type="primary"
                  size="large"
                  class="w-100"
                  @click="onSubmit"
                  v-loading="loading"
                >
                  {{ $t('login.submit') }}
                </el-button>
              </el-form-item>
            </el-form>
            <template v-if="DEMO_PASSWORD">
              <el-divider>{{ $t('login.demoDivider') }}</el-divider>
              <p class="text-muted small">
                {{ $t('login.demoHint') }}
              </p>
              <div v-for="demo in demoUsers" :key="demo.email" class="mb-3">
                <el-button
                  class="w-100"
                  :disabled="loading || waking"
                  @click="loginAsDemo(demo.email)"
                >
                  {{ $t(demo.label) }}
                </el-button>
                <div class="text-muted small mt-1">
                  {{ $t(demo.description) }}
                </div>
              </div>
            </template>
          </el-card>
          <footer-app class="mt-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  height: 100vh;
  overflow-y: auto;
  background: linear-gradient(135deg, #eef1fb 0%, #f7f8fc 50%, #e8eefa 100%);
}
.login-col {
  max-width: 500px;
  padding: 24px 0;
}
.login-card {
  border: none;
  border-radius: 16px;
  padding: 16px 12px;
  box-shadow: 0 10px 30px rgba(63, 81, 181, 0.12);
  :deep(.el-loading-mask) {
    border-radius: inherit;
  }
  :deep(.el-loading-text) {
    padding: 0 24px;
  }
}
.login-header {
  text-align: center;
  margin-bottom: 24px;
}
.login-logo {
  width: 56px;
  height: 56px;
  margin: 0 auto 12px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, #3f51b5, #5c6bc0);
}
</style>
