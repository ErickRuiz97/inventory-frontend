<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check, CircleClose, CirclePlus } from '@element-plus/icons-vue'

import UserForm from './components/UserForm.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { userStore } from '@/stores'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEdit = ref(false)
const storeUser = userStore()
const formUser = ref()
const actions = ref([
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'Guardar',
  },
])
const events = {
  onSave: saveUser,
  onDelete: deleteUser,
  onActive: activeUser,
}

let user = ref({
  email: '',
  password: '',
  roles: [],
  full_name: [],
})
onMounted(() => {
  if (route.params.id) isEdit.value = true
  if (isEdit.value) {
    storeUser.getUserById(route.params.id)
  }
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
async function deleteUser() {
  storeUser.deleteUser(route.params.id)
}

async function activeUser() {
  storeUser.activeUser(route.params.id)
}

watch(
  () => storeUser.entity,
  value => {
    if (value) {
      user.value = value
      if (user.value.active)
        actions.value.push({
          event: 'onDelete',
          type: 'danger',
          icon: CircleClose,
          label: 'Desactivar',
        })
      else
        actions.value.push({
          event: 'onActive',
          type: 'success',
          icon: CirclePlus,
          label: 'Activar',
        })
    }
  }
)

watch(
  () => storeUser.delete,
  value => {
    if (value) {
      ElMessage.success('Usuario eliminado')
      router.push({ path: '/users' })
    }
  }
)

watch(
  () => storeUser.active,
  value => {
    if (value) {
      ElMessage.success('Usuario activado')
      router.push({ path: '/users' })
    }
  }
)

watch(
  () => storeUser.create,
  value => {
    if (value) {
      ElMessage.success('Usuario creado')
      router.push({ path: '/users' })
    }
  }
)

watch(
  () => storeUser.update,
  value => {
    if (value) {
      ElMessage.success('Usuario actualizado')
      router.push({ path: '/users' })
    }
  }
)

watch(
  () => storeUser.error,
  value => {
    if (value) {
      ElMessage.error(value)
      storeUser.error = null
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
    <div class="row formulario-content">
      <el-card shadow="always">
        <user-form ref="formUser" v-model="user" />
      </el-card>
    </div>
  </div>
</template>
<style lang="scss" scoped>
</style>
