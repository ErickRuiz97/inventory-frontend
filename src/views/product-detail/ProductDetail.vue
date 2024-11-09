<script setup>
import { onMounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

import ProductForm from './components/ProductForm.vue'

import { productStore } from '@/stores'

const route = useRoute()
const isEdit = ref(false)
const storeProduct = productStore()
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

watch(
  () => storeProduct.entity,
  value => {
    if (value) {
      product.value = value
    }
  }
)
</script>
<template>
  <div class="container mt-4">
    <div class="row acciones"></div>
    <div class="row formulario">
      <product-form v-model="product" />
    </div>
  </div>
</template>


<style lang="scss" scoped>
</style>
