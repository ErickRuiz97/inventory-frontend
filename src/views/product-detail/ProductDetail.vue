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
import { useConfig } from '@/composables/useConfig'

const route = useRoute()
const router = useRouter()
const isEdit = ref(false)
const storeProduct = productStore()
const formProduct = ref()

const { symbol } = useConfig()

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
  warranty: {
    has_warranty: false,
    measure: '',
    quantity: '',
  },
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
      <div v-if="isEdit" class="row">
        <div class="col-md-3 col-sm-6 col-lg-4 col-xl-3">
          <el-statistic
            :title="`Precio de compra (${symbol})`"
            :value="product.purchase_price"
          >
            {{ product.purchase_price }}
          </el-statistic>
        </div>
        <div class="col-md-3 col-sm-6 col-lg-4 col-xl-3">
          <el-statistic
            :title="`Precio de venta (${symbol})`"
            :value="product.sale_price"
          >
            {{ product.purchase_price }}
          </el-statistic>
        </div>
        <div class="col-md-3 col-sm-6 col-lg-4 col-xl-3">
          <el-statistic title="Unidades disponibles" :value="product.stock">
            {{ product.purchase_price }}
          </el-statistic>
        </div>
      </div>
      <product-form ref="formProduct" v-model="product" />
      <product-prices v-if="isEdit" v-model="product.graph" />
    </template>
  </detail-general>
</template>


<style lang="scss" scoped>
</style>
