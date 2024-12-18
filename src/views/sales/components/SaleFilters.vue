<script setup>
import { onMounted, ref, watch, reactive } from 'vue'
import { payTypes } from '@/constants'

const purchaseQueryElForm = ref()
const defaultTime = ref([
  new Date(1970, 0, 1, 0, 0, 0), // Hora predeterminada para la fecha inicial: 00:00:00
  new Date(1970, 0, 1, 23, 59, 59), // Hora predeterminada para la fecha final: 23:59:59
])
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
let localValue = ref({})

const marks = reactive({
  0: '0',
  5000: 'MAX',
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
</script>
<template>
  <el-form ref="purchaseQueryElForm" :model="localValue" label-position="top">
    <el-form-item label="Fecha" prop="date" class="row">
      <el-date-picker
        v-model="localValue.date"
        type="daterange"
        range-separator="a"
        start-placeholder="Fecha inicial"
        end-placeholder="Fecha final"
        :default-time="defaultTime"
        value-format="YYYY-MM-DDTHH:mm:ss.SSSZ"
      />
    </el-form-item>
    <el-form-item label="Código" prop="code" class="row">
      <el-input v-model="localValue.code" />
    </el-form-item>
    <el-form-item label="Cliente" prop="customer" class="row">
      <el-input v-model="localValue.customer" />
    </el-form-item>
    <el-form-item label="Formas de pago" prop="pay_types" class="row">
      <el-select
        v-model="localValue.pay_types"
        style="width: 100%"
        multiple
        filterable
      >
        <el-option
          v-for="item in payTypes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Gasto total" prop="amount" class="row">
      <el-slider
        v-model="localValue.amount"
        range
        :marks="marks"
        :step="100"
        :max="5000"
      />
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
</style>
