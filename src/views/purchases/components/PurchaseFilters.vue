<script setup>
import { onMounted, ref, watch, reactive } from 'vue'
import { supplierStore } from '@/stores'

const purchaseQueryElForm = ref()
const storeSupplier = supplierStore()
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
let localValue = ref({})

const marks = reactive({
  0: '0',
  10000: 'MAX',
})

onMounted(() => {
  storeSupplier.getSuppliers({}, {})
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
</script>
<template>
  <div>
    <el-form ref="purchaseQueryElForm" :model="localValue" label-position="top">
      <el-form-item label="Fecha" prop="date" class="row">
        <el-date-picker
          v-model="localValue.date"
          type="daterange"
          range-separator="Hasta"
          start-placeholder="Fecha inicial"
          end-placeholder="Fecha final"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item label="Proveedor" prop="supplier" class="row">
        <el-select v-model="localValue.supplier" style="width: 100%" filterable>
          <el-option
            v-for="item in storeSupplier.list?.items"
            :key="item.code"
            :label="`${item.code} - ${item.name}`"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Gasto total" prop="amount" class="row">
        <el-slider
          v-model="localValue.amount"
          range
          :marks="marks"
          :step="100"
          :max="10000"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<style lang="scss" scoped>
</style>
