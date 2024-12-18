<script setup>
import _ from 'lodash'
import { onMounted, watch, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { storeToRefs } from 'pinia'
import { objectUtils } from '@/utils'

import ListGeneral from '@/components/ListGeneral.vue'
import HeaderTable from '@/components/header-table/HeaderTable.vue'
import SuppliersTable from './components/SuppliersTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import SupplierFilters from './components/SupplierFilters.vue'

import { supplierStore } from '@/stores'
const router = useRouter()
const storeSupplier = supplierStore()
const actions = [
  {
    event: 'onNewSupplier',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewSupplier: newSupplier,
  onRefresh: getSuppliers,
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
}
let suppliers = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
const { paginator } = storeToRefs(storeSupplier)
let filters = ref({
  name: '',
  code: '',
  contact_name: '',
  contact_email: '',
  contact_phone: '',
})

onMounted(() => {
  filters.value = _.cloneDeep(storeSupplier.filters)
  getSuppliers()
})

function getSuppliers() {
  loading.value = true
  storeSupplier.getSuppliers(
    objectUtils.cleanQueryEmpties(storeSupplier.filters)
  )
}

function newSupplier() {
  router.push({ path: `/suppliers/create` })
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
  () => storeSupplier.list,
  value => {
    suppliers = reactive(value.items)
    _.merge(storeSupplier.paginator, { total: value.total })
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    _.merge(storeSupplier.paginator, value)
    getSuppliers()
  }
)

function clickRow(row) {
  router.push({ path: `/suppliers/${row._id}` })
}

function cancelFilter() {
  filters.value = _.cloneDeep(storeSupplier.filters)
  onShowFilters.value = false
}

function confirmFilter() {
  _.merge(storeSupplier.paginator, { page: 1 })
  storeSupplier.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getSuppliers()
}

function sortChange() {
  _.merge(storeSupplier.paginator, { page: 1 })
  getSuppliers()
}

function cleanFilter() {
  _.merge(storeSupplier.paginator, { page: 1 })
  filters.value = {
    name: '',
    code: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
  }
  storeSupplier.filters = _.cloneDeep(filters.value)
  getSuppliers()
}

const isFiltered = computed(() =>
  _.isEqual(filters.value, {
    name: '',
    code: '',
    contact_name: '',
    contact_email: '',
    contact_phone: '',
  })
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
      <header-table :paginator="paginator" @change="getSuppliers" />
    </template>
    <template #table>
      <suppliers-table
        v-model="suppliers"
        @click-row="clickRow"
        @sort-change="sortChange"
        :loading="loading"
      />
    </template>
    <template #filters>
      <supplier-filters v-model="filters" />
    </template>
  </list-general>
</template>
