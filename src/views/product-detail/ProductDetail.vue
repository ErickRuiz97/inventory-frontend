<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Check } from '@element-plus/icons-vue'

import ProductForm from './components/ProductForm.vue'
import ActionsHeader from '@/components/ActionsHeader.vue'

import { productStore } from '@/stores'

const route = useRoute()
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
    }
  }
)

watch(
  () => storeProduct.update,
  value => {
    console.log(value)
    if (value) {
      ElMessage.success('Producto actualizado')
    }
  }
)

watch(
  () => storeProduct.error,
  value => {
    if (value) {
      ElMessage.error(value)
    }
  }
)
</script>
<template>
  <div class="container">
    <div class="row header-content">
      <actions-header
        :actions="actions"
        :refresh="false"
        @action="eventHandler"
      ></actions-header>
    </div>
    <div class="row formulario">
      <product-form ref="formProduct" v-model="product" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
