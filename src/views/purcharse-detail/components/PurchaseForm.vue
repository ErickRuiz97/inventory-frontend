<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { supplierStore } from '@/stores'
import { useI18n } from 'vue-i18n'

import SelectProducts from './SelectProducts.vue'

const purchaseElForm = ref()
const { t } = useI18n()
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
  storeSupplier.getSuppliers({}, false)
})

watch(
  () => props.modelValue,
  value => {
    if (value) {
      localValue.value = value
    }
  },
)

const rules = reactive({
  supplier_id: [
    {
      required: true,
      message: () => t('purchases.supplierRequired'),
      trigger: 'blur',
    },
  ],
  products: [
    {
      type: 'array',
      required: true,
      message: () => t('validation.atLeastOneProduct'),
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
        :label="$t('common.supplier')"
        prop="supplier_id"
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
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

<style lang="scss" scoped></style>
