<script setup>
import _ from 'lodash'
import { onMounted, watch, ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { objectUtils } from '@/utils'

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
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
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
    objectUtils.cleanQueryEmpties(storeSupplier.filters),
    paginator
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
    paginator.total = value.total
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    paginator = value
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
  storeSupplier.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getSuppliers()
}

function cleanFilter() {
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
  <div>
    <div class="row header-content">
      <actions-header
        :actions="actions"
        @action="eventHandler"
        :filter-active="!isFiltered"
      ></actions-header>
    </div>
    <div class="row">
      <header-table :paginator="paginator" @change="getSuppliers" />
    </div>
    <div class="row table-content">
      <suppliers-table
        v-model="suppliers"
        @click-row="clickRow"
        :loading="loading"
      />
    </div>

    <el-drawer v-model="onShowFilters" direction="rtl">
      <template #header>
        <h4>Filtro de búsqueda</h4>
      </template>
      <template #default>
        <supplier-filters v-model="filters" />
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
