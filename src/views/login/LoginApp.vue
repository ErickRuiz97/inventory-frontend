<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const loginForm = ref({
  email: '',
  password: '',
})

const rules = {
  email: [
    { required: true, message: 'Por favor ingrese su email', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: 'Por favor ingrese su contraseña',
      trigger: 'blur',
    },
  ],
}

const onSubmit = () => {
  // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
  ElMessage.success('¡Login exitoso!')
}
</script>
<template>
  <div class="container h-100 align-middle">
    <div class="row justify-content-center mt-4">
      <div class="col-md-4">
        <el-card class="card">
          <div class="card-body">
            <h4 class="card-title">Inventario</h4>
            <h5 class="card-subtitle mb-2 text-muted">Inicio de sesión</h5>
          </div>
          <el-form :model="loginForm" :rules="rules" label-position="top">
            <el-form-item label="Email" prop="email">
              <el-input v-model="loginForm.email" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input v-model="loginForm.password" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">Login</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
