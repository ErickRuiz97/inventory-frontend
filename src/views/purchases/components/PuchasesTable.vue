<script setup>
import moment from 'moment'
import { ref, watch } from 'vue'

const emit = defineEmits(['clickRow'])

const props = defineProps({
  modelValue: {
    type: [Array],
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
})

const formattedData = ref([])

const formatData = () => {
  formattedData.value = props.modelValue.map(item => ({
    ...item,
    sale_date: moment(item.sale_date).format('DD/MM/YYYY'),
  }))
}

watch(() => props.modelValue, formatData, { immediate: true })

function clickRow(row) {
  emit('clickRow', row)
}
</script>

<template>
  <div>
    <el-table
      :data="formattedData"
      max-height="70vh"
      v-loading="props.loading"
      class="tables"
    >
      <el-table-column prop="supplier" label="Proveedor" />
      <el-table-column prop="total_amount" label="Cantidad total" />
      <el-table-column prop="sale_date" label="Fecha de venta" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
</style>
