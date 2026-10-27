<script setup>
import { ref, reactive, watch } from 'vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import { Check } from '@element-plus/icons-vue'
import { userStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import DetailGeneral from '@/components/DetailGeneral.vue'

const router = useRouter()
const storeUser = reactive(userStore())
const changePasswordForm = ref()
const { t } = useI18n()
const actions = [
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'common.save',
  },
]
const events = {
  onSave: saveNewPassword,
}

function eventHandler(eventKey) {
  events[eventKey]()
}

async function saveNewPassword() {
  const valid = await validForm()
  if (valid) {
    let user = JSON.parse(localStorage.getItem('user'))
    let body = {
      email: user.email,
      password: infoNewPassword.value.newPassword,
      oldPassword: infoNewPassword.value.password,
    }
    storeUser.changePassword(body)
  }
}

function validForm() {
  return new Promise(resolve => {
    changePasswordForm.value.validate(valid => {
      resolve(valid)
    })
  })
}

let infoNewPassword = ref({
  password: '',
  newPassword: '',
  confirmNewPassword: '',
})

const rules = reactive({
  password: [
    {
      required: true,
      message: () => t('changePassword.passwordRequired'),
      trigger: 'blur',
    },
  ],
  newPassword: [
    {
      required: true,
      message: () => t('changePassword.newPasswordRequired'),
      trigger: 'blur',
    },
  ],
  confirmNewPassword: [
    {
      required: true,
      message: () => t('changePassword.confirmRequired'),
      trigger: 'blur',
    },
    {
      validator: (rule, value) => {
        if (value !== infoNewPassword.value.newPassword) {
          return new Error(t('changePassword.mismatch'))
        }
        return true
      },
      trigger: 'blur',
    },
  ],
})
watch(
  () => storeUser.changePsw,
  value => {
    if (value) {
      ElMessage.success(t('changePassword.success'))
      router.push({ path: '/' })
    }
  },
)
watch(
  () => storeUser.error,
  value => {
    if (value) {
      ElMessage.error(value)
      storeUser.error = null
    }
  },
)
</script>

<template>
  <detail-general>
    <template #header>
      <actions-header
        :actions="actions"
        :refresh="false"
        @action="eventHandler"
      ></actions-header>
    </template>
    <template #body>
      <el-form
        ref="changePasswordForm"
        :model="infoNewPassword"
        :rules="rules"
        label-position="top"
      >
        <el-form-item
          :label="$t('changePassword.password')"
          prop="password"
          class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
        >
          <el-input
            v-model="infoNewPassword.password"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item
          :label="$t('changePassword.newPassword')"
          prop="newPassword"
          class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
        >
          <el-input
            v-model="infoNewPassword.newPassword"
            type="password"
            show-password
          />
        </el-form-item>
        <el-form-item
          :label="$t('changePassword.confirmNewPassword')"
          prop="confirmNewPassword"
          class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
        >
          <el-input
            v-model="infoNewPassword.confirmNewPassword"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
    </template>
  </detail-general>
</template>
