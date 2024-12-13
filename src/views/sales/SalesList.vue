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
import SalesTable from './components/SalesTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import SaleFilters from './components/SaleFilters.vue'

import { saleStore } from '@/stores'
const router = useRouter()
const storeSale = saleStore()
const actions = [
  {
    event: 'onNewSales',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewSale: newSale,
  onRefresh: getSales,
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
}
let sales = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
const { paginator } = storeToRefs(storeSale)

let filters = ref({
  date: [],
  customer: '',
  pay_types: '',
  amount: [0, 5000],
})

onMounted(() => {
  filters.value = _.cloneDeep(storeSale.filters)
  getSales()
})

function getSales() {
  loading.value = true
  storeSale.getSales(objectUtils.cleanQueryEmpties(storeSale.filters))
}

function newSale() {
  router.push({ path: `/sales/create` })
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
  () => storeSale.list,
  value => {
    sales = reactive(value.items)
    _.merge(storeSale.paginator, { total: value.total })
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    _.merge(storeSale.paginator, value)
    getSales()
  }
)

function clickRow(row) {
  router.push({ path: `/sales/${row._id}` })
}

function cancelFilter() {
  filters.value = _.cloneDeep(storeSale.filters)
  onShowFilters.value = false
}

function confirmFilter() {
  _.merge(storeSale.paginator, { page: 1 })
  storeSale.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getSales()
}

function cleanFilter() {
  _.merge(storeSale.paginator, { page: 1 })
  filters.value = {
    date: [],
    customer: '',
    pay_types: '',
    amount: [0, 5000],
  }
  storeSale.filters = _.cloneDeep(filters.value)
  getSales()
}

const isFiltered = computed(() =>
  _.isEqual(filters.value, {
    date: [],
    customer: '',
    pay_types: '',
    amount: [0, 5000],
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
      <header-table :paginator="paginator" @change="getSales" />
    </template>
    <template #table>
      <sales-table v-model="sales" @click-row="clickRow" :loading="loading" />
    </template>
    <template #filters>
      <sale-filters v-model="filters" />
    </template>
  </list-general>
</template>
