<script setup>
import _ from 'lodash'
import { onMounted, watch, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { objectUtils } from '@/utils'

import ListGeneral from '@/components/ListGeneral.vue'
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
  {
    event: 'onUsersReport',
    type: 'success',
    icon: Document,
    label: 'Reporte',
  },
]
const events = {
  onNewUser: newUser,
  onRefresh: getUsers,
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
  onUsersReport: downloadReport,
}
let users = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
const { paginator } = storeToRefs(storeUser)

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
  storeUser.getUsers(objectUtils.cleanQueryEmpties(storeUser.filters))
}

function downloadReport() {
  loading.value = true
  storeUser.getUsersReport(objectUtils.cleanQueryEmpties(storeUser.filters))
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
    _.merge(storeUser.paginator, { total: value.total })
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    _.merge(storeUser.paginator, value)
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
  _.merge(storeUser.paginator, { page: 1 })
  storeUser.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getUsers()
}

function sortChange() {
  _.merge(storeUser.paginator, { page: 1 })
  getUsers()
}

function cleanFilter() {
  _.merge(storeUser.paginator, { page: 1 })
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

watch(
  () => storeUser.report,
  newVal => {
    if (newVal) {
      loading.value = false
      objectUtils.downloadFile(newVal, 'ReporteUsuarios.xlsx')
    }
  }
)

watch(
  () => storeUser.error,
  value => {
    if (value) {
      loading.value = false
      ElMessage.error(value)
      storeUser.error = null
    }
  }
)
</script>
<template>
  <list-general
    :is-show-filters="onShowFilters"
    @cancel-filter="cancelFilter"
    @confirm-filter="confirmFilter"
  >
    <template #actions>
      <actions-header
        :actions="actions"
        :filter-active="!isFiltered"
        @action="eventHandler"
      ></actions-header>
    </template>
    <template #header>
      <header-table :paginator="paginator" @change="getUsers" />
    </template>
    <template #table>
      <users-table
        v-model="users"
        @click-row="clickRow"
        @sort-change="sortChange"
        :loading="loading"
      />
    </template>
    <template #filters>
      <user-filters v-model="filters" />
    </template>
  </list-general>
</template>
