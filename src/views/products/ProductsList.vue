<script setup>
import { onMounted, watch, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

import HeaderTable from '@/components/header-table/HeaderTable.vue'
import ProductsTable from './components/ProductsTable.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

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
}
let products = reactive([])
let loading = ref(true)
let paginator = reactive({
  limit: 20,
  page: 1,
  total: 0,
})
onMounted(() => {
  getProducts()
})

function getProducts() {
  const filters = {}
  loading.value = true
  storeProduct.getProducts(filters, paginator)
}

function newProduct() {
  router.push({ path: `/products/create` })
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
    paginator.total = value.total
    loading.value = false
  }
)

watch(
  () => paginator,
  value => {
    paginator = value
    getProducts()
  }
)

function clickRow(row) {
  router.push({ path: `/products/${row._id}` })
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
      <header-table :paginator="paginator" @change="getProducts" />
    </div>
    <div class="row table-content">
      <products-table
        v-model="products"
        @click-row="clickRow"
        :loading="loading"
      />
    </div>
  </div>
</template>
