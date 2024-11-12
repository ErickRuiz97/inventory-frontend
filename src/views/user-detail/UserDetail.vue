<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'

import UserForm from './components/UserForm.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { userStore } from '@/stores';
import { useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const isEdit = ref(false)
const storeUser = userStore()
const formUser = ref()
const actions = [
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'Guardar',
  },
]
const events = {
  onSave: saveUser,
}

let user = ref({
  email: '',
  password: '',
  roles: [],
  full_name: [],
})
onMounted(() => {
  if (route.params.id) isEdit.value = true
  if (isEdit.value) storeUser.getUserById(route.params.id)
})

function eventHandler(eventKey) {
  events[eventKey]()
}

async function saveUser() {
  const valid = await formUser.value.validForm()
  if (valid) {
    if (isEdit.value) storeUser.updateUser(route.params.id, user.value)
    else storeUser.createUser(user.value)
  }
}

watch(
  () => storeUser.entity,
  value => {
    if (value) {
      user.value = value
    }
  }
)

watch(
  () => storeUser.create,
  value => {
    if (value) {
      ElMessage.success('Usuario creado');
      router.push({ path: "/users" });
    }
  }
)

watch(
  () => storeUser.update,
  value => {
    if (value) {
      ElMessage.success('Usuario actualizado')
      router.push({ path: "/users" });
    }
  }
)

watch(
  () => storeUser.error,
  value => {
    if (value) {
      ElMessage.error(value)
    }
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
    <div class="row formulario-content p-2">
      <el-card shadow="always">
        <user-form ref="formUser" v-model="user" />
      </el-card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
