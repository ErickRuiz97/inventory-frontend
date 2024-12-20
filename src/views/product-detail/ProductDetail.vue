<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'

import DetailGeneral from '@/components/DetailGeneral.vue'
import ProductForm from './components/ProductForm.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'
import ProductPrices from './components/ProductPrices.vue'

import { productStore } from '@/stores'
const route = useRoute()
const router = useRouter()
const isEdit = ref(false)
const storeProduct = productStore()
const formProduct = ref()
const actions = [
  {
    event: 'onSave',
    type: 'primary',
    icon: Check,
    label: 'Guardar',
  },
]
const events = {
  onSave: saveProduct,
}

let product = ref({
  code: '',
  name: '',
  description: '',
  categories: [],
  graph: [],
})
onMounted(() => {
  if (route.params.id) isEdit.value = true

  if (isEdit.value) storeProduct.getProductById(route.params.id)
})

function eventHandler(eventKey) {
  events[eventKey]()
}

async function saveProduct() {
  const valid = await formProduct.value.validForm()
  if (valid) {
    if (isEdit.value) storeProduct.updateProduct(route.params.id, product.value)
    else storeProduct.createProduct(product.value)
  }
}

watch(
  () => storeProduct.entity,
  value => {
    if (value) {
      product.value = value
    }
  }
)

watch(
  () => storeProduct.create,
  value => {
    if (value) {
      ElMessage.success('Producto creado')
      router.push({ path: '/products' })
    }
  }
)

watch(
  () => storeProduct.update,
  value => {
    if (value) {
      ElMessage.success('Producto actualizado')
      router.push({ path: '/products' })
    }
  }
)

watch(
  () => storeProduct.error,
  value => {
    if (value) {
      ElMessage.error(value)
      storeProduct.error = null
    }
  }
)
</script>
<template>
  <detail-general>
    <template #header>
      <actions-header
        :actions="actions"
        :refresh="false"
        @action="eventHandler"
      ></actions-header>
    </template>
    <template #body>
      <product-form ref="formProduct" v-model="product" />
      <product-prices v-model="product.graph" />
    </template>
  </detail-general>
</template>


<style lang="scss" scoped>
</style>
