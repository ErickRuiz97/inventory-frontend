<script setup>
import { ref, watch, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { authStore } from '@/stores'
import { authService } from '@/services'
import { demoUsers } from '@/constants'
import { DEMO_PASSWORD } from '@/globalVars'

const router = useRouter()
const storeAuth = authStore()

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
    .catch(() =>
      ElMessage.warning(
        'No se pudo conectar con el servidor. Intenta de nuevo en unos minutos.',
      ),
    )
    .finally(() => (waking.value = false))
})

const rules = reactive({
  email: [
    {
      required: true,
      message: 'Por favor ingrese su email',
      trigger: 'blur',
      type: 'email',
    },
  ],
  password: [
    {
      required: true,
      message: 'Por favor ingrese su contraseña',
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
      ElMessage.error('Usuario o contraseña incorrecto')
      storeAuth.error = null
    }
  },
)
</script>
<template>
  <div class="container h-100 d-flex align-items-center justify-content-center">
    <div class="row w-100">
      <div class="col-md-6 col-lg-4 col-xl-4 col-sm-12 mx-auto">
        <el-card
          class="card"
          v-loading="waking"
          element-loading-text="Despertando el servidor, puede tardar hasta un minuto..."
        >
          <div class="card-body ps-0">
            <h5 class="card-subtitle mb-2 text-muted">Inicio de sesión</h5>
          </div>
          <el-form
            ref="loginElForm"
            :model="loginForm"
            :rules="rules"
            label-position="top"
          >
            <el-form-item label="Usuario" prop="email">
              <el-input v-model="loginForm.email" />
            </el-form-item>
            <el-form-item label="Contraseña" prop="password">
              <el-input v-model="loginForm.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" v-loading="loading">
                Iniciar sesión
              </el-button>
            </el-form-item>
          </el-form>
          <template v-if="DEMO_PASSWORD">
            <el-divider>¿Solo quieres explorar?</el-divider>
            <p class="text-muted small">
              Entra con un usuario de prueba, sin registrarte.
            </p>
            <div v-for="demo in demoUsers" :key="demo.email" class="mb-3">
              <el-button
                class="w-100"
                :disabled="loading"
                @click="loginAsDemo(demo.email)"
              >
                {{ demo.label }}
              </el-button>
              <div class="text-muted small mt-1">{{ demo.description }}</div>
            </div>
          </template>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
