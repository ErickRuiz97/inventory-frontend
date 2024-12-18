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
import ProductsTable from './components/ProductsTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import ProductFilters from './components/ProductFilters.vue'

import { productStore } from '@/stores'
const router = useRouter()
const storeProduct = productStore()
const actions = [
  {
    event: 'onNewProduct',
    type: 'primary',
    icon: Plus,
    label: 'Nuevo',
  },
]
const events = {
  onNewProduct: newProduct,
  onRefresh: getProducts,
  onFilter: showFilters,
  onCleanFilter: cleanFilter,
}
let products = reactive([])
let loading = ref(true)
let onShowFilters = ref(false)
const { paginator } = storeToRefs(storeProduct)

let filters = ref({
  name: '',
  code: '',
  categories: [],
  stock: 'ALL',
})

onMounted(() => {
  filters.value = _.cloneDeep(storeProduct.filters)
  getProducts()
})

function getProducts() {
  loading.value = true
  storeProduct.getProducts(objectUtils.cleanQueryEmpties(storeProduct.filters))
}

function newProduct() {
  router.push({ path: `/products/create` })
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
  () => storeProduct.list,
  value => {
    products = reactive(value.items)
    _.merge(storeProduct.paginator, { total: value.total })
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    _.merge(storeProduct.paginator, value)
    getProducts()
  }
)

function clickRow(row) {
  router.push({ path: `/products/${row._id}` })
}

function cancelFilter() {
  filters.value = _.cloneDeep(storeProduct.filters)
  onShowFilters.value = false
}

function confirmFilter() {
  _.merge(storeProduct.paginator, { page: 1 })
  storeProduct.filters = _.cloneDeep(filters.value)
  onShowFilters.value = false
  getProducts()
}

function sortChange() {
  _.merge(storeProduct.paginator, { page: 1 })
  getProducts()
}

function cleanFilter() {
  _.merge(storeProduct.paginator, { page: 1 })
  filters.value = {
    name: '',
    code: '',
    categories: [],
    stock: 'ALL',
  }
  storeProduct.filters = _.cloneDeep(filters.value)
  getProducts()
}

const isFiltered = computed(() =>
  _.isEqual(filters.value, {
    name: '',
    code: '',
    categories: [],
    stock: 'ALL',
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
      <header-table :paginator="paginator" @change="getProducts" />
    </template>
    <template #table>
      <products-table
        v-model="products"
        @click-row="clickRow"
        @sort-change="sortChange"
        :loading="loading"
      />
    </template>
    <template #filters>
      <product-filters v-model="filters" />
    </template>
  </list-general>
</template>
