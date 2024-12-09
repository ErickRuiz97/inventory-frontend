<script setup>
import _ from 'lodash'
import { onMounted, watch, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { objectUtils } from '@/utils'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import UsersTable from './components/UsersTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import UserFilters from './components/UserFilters.vue'

import { userStore } from '@/stores'

const router = useRouter()
const storeUser = userStore()
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
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
}
let users = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
let filters = ref({
  full_name: '',
  email: '',
  roles: [],
  state: 'ALL',
})
onMounted(() => {
  filters.value = _.cloneDeep(storeUser.filters)
  getUsers()
})

function getUsers() {
  loading.value = true
  storeUser.getUsers(
    objectUtils.cleanQueryEmpties(storeUser.filters),
    paginator
  )
}

function newUser() {
  router.push({ path: `/users/create` })
}

function showFilters() {
  onShowFilters.value = true
}

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

function cancelFilter() {
  filters.value = _.cloneDeep(storeUser.filters)
  onShowFilters.value = false
}

function confirmFilter() {
  storeUser.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getUsers()
}

function cleanFilter() {
  filters.value = {
    full_name: '',
    email: '',
    roles: [],
    state: 'ALL',
  }
  storeUser.filters = _.cloneDeep(filters.value)
  getUsers()
}

const isFiltered = computed(() =>
  _.isEqual(filters.value, {
    full_name: '',
    email: '',
    roles: [],
    state: 'ALL',
  })
)
</script>
<template>
  <div>
    <div class="row header-content">
      <actions-header
        :actions="actions"
        @action="eventHandler"
        :filter-active="!isFiltered"
      ></actions-header>
    </div>
    <div class="row">
      <header-table :paginator="paginator" @change="getUsers" />
    </div>
    <div class="row table-content">
      <users-table v-model="users" @click-row="clickRow" :loading="loading" />
    </div>
    <el-drawer v-model="onShowFilters" direction="rtl">
      <template #header>
        <h4>Filtro de búsqueda</h4>
      </template>
      <template #default>
        <user-filters v-model="filters" />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelFilter">Cancelar</el-button>
          <el-button type="primary" @click="confirmFilter">Aceptar</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>
