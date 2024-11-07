<script setup>
import { ref, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { authStore } from '@/stores'

const router = useRouter()
const storeAuth = authStore()

const loginElForm = ref()
const loginForm = reactive({
  email: '',
  password: '',
})
let loading = ref(false)

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

const onSubmit = () => {
  loginElForm.value.validate(valid => {
    if (valid) {
      loading.value = true
      storeAuth.loginRequest(loginForm)
    }
  })
}

watch(
  () => storeAuth.login,
  value => {
    if (value) {
      loading.value = false
      ElMessage.success('¡Login exitoso!')
      router.push({ path: '/' })
    }
  }
)
watch(
  () => storeAuth.error,
  value => {
    if (value) {
      loading.value = false
      ElMessage.error(value.error)
    }
  }
)
</script>
<template>
  <div class="container h-100 align-middle">
    <div class="row justify-content-center mt-4">
      <div class="col-md-6 col-lg-4 col-xl-4 col-sm-12">
        <el-card class="card">
          <div class="card-body">
            <h4 class="card-title">Inventario</h4>
            <h5 class="card-subtitle mb-2 text-muted">Inicio de sesión</h5>
          </div>
          <el-form
            ref="loginElForm"
            :model="loginForm"
            :rules="rules"
            label-position="top"
          >
            <el-form-item label="Email" prop="email">
              <el-input v-model="loginForm.email" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="loginForm.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" v-loading="loading"
                >Login</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
