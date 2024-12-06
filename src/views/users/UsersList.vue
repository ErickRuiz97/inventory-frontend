<script setup>
import { onMounted, watch, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import UsersTable from './components/UsersTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { userStore } from '@/stores'

const router = useRouter();
const storeUser = userStore();
const actions = [
  {
    event: 'onNewUser',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewUser: newUser,
  onRefresh: getUsers,
};
let users = reactive([])
let loading = ref(true)
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
onMounted(() => {
  getUsers()
})

function getUsers() {
  const filters = {}
  loading.value = true
  storeUser.getUsers(filters, paginator)
}

function newUser() {
  router.push({ path: `/users/create` })
};

function eventHandler(eventKey) {
  try {
    events[eventKey]()
  } catch {
    ElMessage.warning('Evento no implementado')
  }
}
watch(
  () => storeUser.list,
  value => {
    users = reactive(value.items)
    paginator.total = value.total
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    paginator = value
    getUsers()
  }
)
function clickRow(row) {
  router.push({ path: `/users/${row._id}` })
}
</script>
<template>
  <div>
    <div class="row header-content">
      <actions-header
        :actions="actions"
        @action="eventHandler"
      ></actions-header>
    </div>
    <div class="row">
      <header-table :paginator="paginator" @change="getUsers" />
    </div>
    <div class="row table-content">
      <users-table
        v-model="users"
        @click-row="clickRow"
        :loading="loading"
      />
    </div>
  </div>
</template>