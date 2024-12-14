<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { payTypes } from '@/constants'
import SelectProducts from './SelectProducts.vue'

const saleElForm = ref()
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        customer: '',
        pay_type: '',
        products: [],
      }
    },
  },
})
let localValue = ref({
  customer: '',
  pay_type: '',
  products: [],
})

onMounted(() => {
  localValue.value = props.modelValue
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
  pay_type: [
    {
      required: true,
      message: 'Por favor ingrese un tipo de pago',
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
  return saleElForm.value.validate(valid => valid)
}

defineExpose({ validForm })
</script>
<template>
  <el-form
    ref="saleElForm"
    :model="localValue"
    :rules="rules"
    label-position="top"
  >
    <div class="row">
      <el-form-item
        label="Cliente"
        prop="customer"
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
      >
        <el-input v-model="localValue.customer" placeholder="Cliente" />
      </el-form-item>
      <el-form-item
        label="Tipo de pago"
        prop="pay_type"
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
      >
        <el-select v-model="localValue.pay_type" style="width: 100%" filterable>
          <el-option
            v-for="item in payTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </div>
    <div class="row">
      <div prop="products" class="col-sm-12 col-md-12 col-lg-10 col-xl-8">
        <select-products v-model="localValue.products" />
      </div>
    </div>
    <el-form-item prop="products" class="col-sm-12 col-md-6 col-lg-5 col-xl-4">
      <el-table
        v-show="false"
        :data="localValue.products"
        class=""
        show-summary
      >
      </el-table>
    </el-form-item>
  </el-form>
</template>


<style lang="scss" scoped>
</style>
