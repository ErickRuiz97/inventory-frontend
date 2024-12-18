<script setup>
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        purchase: '',
        detail: [],
      }
    },
  },
});

function getSummary({ columns, data }) {
  const sums = []
  columns.forEach((column, index) => {
    if (column.property === 'total_price') {
      const total = data.reduce((sum, row) => sum + Number(row.total_price || 0), 0)
      sums[index] = `Total: $${total.toFixed(2)}`
    } else {
      sums[index] = '';
    }
  })
  return sums
}

let localValue = ref({
  purchase: '',
  detail: [],
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
    <div class="row" v-if="localValue.purchase">
      <div class="col-md-6 col-sm-12 col-lg-4 col-xl-3">
        <label class="fw-bold mb-1">Código Prov.</label>
        <p class="text-muted mb-0">
          {{ localValue.purchase.supplier.code }}
        </p>
      </div>
      <div class="col-md-6 col-sm-12 col-lg-4 col-xl-3">
        <label class="fw-bold mb-1">Proveedor</label>
        <p class="text-muted mb-0">{{ localValue.purchase.supplier.name }}</p>
      </div>
    </div>
    <div class="mt-2">
      <el-table :data="localValue.detail" show-summary :summary-method="getSummary" fit>
        <el-table-column
          prop="product.name"
          label="Producto"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="units"
          label="Unidades"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="total_price"
          label="Precio total"
          align="right"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
