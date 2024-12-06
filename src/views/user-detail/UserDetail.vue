<script setup>
import { onMounted, watch, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue';
import { Delete } from '@element-plus/icons-vue'

import UserForm from './components/UserForm.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { userStore } from '@/stores';
import { useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const isEdit = ref(false)
const storeUser = userStore()
const formUser = ref()
const actions = reactive([
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'Guardar',
  }
]);
const events = {
  onSave: saveUser,
  onDelete: deleteUser,
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
    console.log('hola')
    storeUser.getUserById(route.params.id);
    actions.push({
      event: 'onDelete',
      type: 'danger',
      icon: Delete,
      label: 'Eliminar',
    });
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

watch(
  () => storeUser.entity,
  value => {
    if (value) {
      user.value = value
    }
  }
)

watch(
  () => storeUser.delete,
  value => {
    if (value) {
      ElMessage.success('Usuario eliminado');
      router.push({ path: "/users" });
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
