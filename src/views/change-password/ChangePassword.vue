<script setup>
import { ref, reactive, watch } from 'vue';
import ActionsHeader from '@/components/ActionsHeader.vue';
import { Check } from '@element-plus/icons-vue'
import { userStore } from '@/stores';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'

const router = useRouter()
const storeUser = reactive(userStore());
const changePasswordForm = ref();
const actions = [
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'Guardar',
  },
];
const events = {
  onSave: saveNewPassword,
};

function eventHandler(eventKey) {
  events[eventKey]();
}

async function saveNewPassword() {
  const valid = await validForm();
  if (valid) {
    let user = JSON.parse(localStorage.getItem('user'));
    let body = {
      email: user.email,
      password: infoNewPassword.value.newPassword,
      oldPassword: infoNewPassword.value.password
    }
    storeUser.changePassword(body);
  } else {
    console.log('Formulario inválido');
  }
}

function validForm() {
  return new Promise((resolve) => {
    changePasswordForm.value.validate((valid) => {
      resolve(valid);
    });
  });
}

let infoNewPassword = ref({
  password: "",
  newPassword: "",
  confirmNewPassword: ""
});

const rules = reactive({
  password: [
    {
      required: true,
      message: 'Por favor ingrese la contraseña',
      trigger: 'blur',
    },
  ],
  newPassword: [
    {
      required: true,
      message: 'Por favor ingrese la nueva contraseña',
      trigger: 'blur',
    },
  ],
  confirmNewPassword: [
    {
      required: true,
      message: 'Por favor confirme la nueva contraseña',
      trigger: 'blur',
    },
    {
      validator: (rule, value) => {
        if (value !== infoNewPassword.value.newPassword) {
          return new Error('Las contraseñas no coinciden');
        }
        return true;
      },
      trigger: 'blur',
    },
  ],
});
watch(
  () => storeUser.changePsw,
  value => {
    if (value) {
      ElMessage.success('Contraseña cambiada exitosamente!')
      router.push({ path: '/' })
    }
  }
)
watch(
  () => storeUser.error,
  value => {
    ElMessage.error(value)
  }
)
</script>

<template>
  <div>
    <div class="row header-content">
      <actions-header
        :actions="actions"
        :refresh="false"
        @action="eventHandler"
      ></actions-header>
    </div>
    <el-card shadow="always">
      <el-form
        ref="changePasswordForm"
        :model="infoNewPassword"
        :rules="rules"
        label-position="top"
      >
        <el-form-item
          label="Contraseña"
          prop="password"
          class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
        >
          <el-input v-model="infoNewPassword.password" type="password" show-password />
        </el-form-item>
        <el-form-item
          label="Nueva contraseña"
          prop="newPassword"
          class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
        >
          <el-input v-model="infoNewPassword.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item
          label="Confirmar nueva contraseña"
          prop="confirmNewPassword"
          class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
        >
          <el-input v-model="infoNewPassword.confirmNewPassword" type="password" show-password />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
