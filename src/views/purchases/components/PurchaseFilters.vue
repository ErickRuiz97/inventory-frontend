<script setup>
import { onMounted, ref, watch, reactive } from 'vue'

const purchaseQueryElForm = ref()
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
        />
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
