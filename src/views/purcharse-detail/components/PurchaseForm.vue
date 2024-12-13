<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { supplierStore } from '@/stores'

import SelectProducts from './SelectProducts.vue'

const purchaseElForm = ref()
const storeSupplier = supplierStore()
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return { supplier_id: '', products: [] }
    },
  },
})
let localValue = ref({
  supplier_id: '',
  products: [],
})

onMounted(() => {
  localValue.value = props.modelValue
  storeSupplier.getSuppliers({})
})

watch(
  () => props.modelValue,
  value => {
    if (value) {
      localValue.value = value
    }
  }
)

const rules = reactive({
  supplier_id: [
    {
      required: true,
      message: 'Por favor ingrese el supplier',
      trigger: 'blur',
    },
  ],
  products: [
    {
      type: 'array',
      required: true,
      message: 'Por favor ingrese al menos un producto',
      validator: (rule, value) => {
        return Array.isArray(value) && value.length > 0
      },
      trigger: 'change',
    },
  ],
})

function validForm() {
  return purchaseElForm.value.validate(valid => valid)
}

defineExpose({ validForm })
</script>
<template>
  <el-form
    ref="purchaseElForm"
    :model="localValue"
    :rules="rules"
    label-position="top"
  >
    <div class="row">
      <el-form-item
        label="Proveedor"
        prop="supplier_id"
        class="col-sm-12 col-md-5 col-lg-4 col-xl-3"
      >
        <el-select
          v-model="localValue.supplier_id"
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in storeSupplier.list?.items"
            :key="item.code"
            :label="`${item.code} - ${item.name}`"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
    </div>
    <div class="row">
      <el-form-item
        prop="products"
        class="col-sm-12 col-md-10 col-lg-9 col-xl-8"
      >
        <select-products v-model="localValue.products" />
      </el-form-item>
    </div>
  </el-form>
</template>


<style lang="scss" scoped>
</style>
