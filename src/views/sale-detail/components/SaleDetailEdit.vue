<script setup>
import { onMounted, ref, watch } from 'vue'
import { useConfig } from '@/composables/useConfig'
import { useI18n } from 'vue-i18n'

const { symbol } = useConfig()
const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        detail: [],
      }
    },
  },
})

function getSummary({ columns, data }) {
  const sums = []
  columns.forEach((column, index) => {
    if (column.property === 'total_price') {
      const total = data.reduce(
        (sum, row) => sum + Number(row.total_price || 0),
        0,
      )
      sums[index] = `${t('common.total')}: ${symbol.value} ${total.toFixed(2)}`
    } else {
      sums[index] = ''
    }
  })
  return sums
}

let localValue = ref({
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
  },
)
</script>
<template>
  <div>
    <div v-if="localValue.sale" class="row">
      <div class="col-md-6 col-sm-12 col-lg-4 col-xl-3">
        <label class="fw-bold mb-1">{{ $t('common.customer') }}</label>
        <p class="text-muted mb-0">{{ localValue.sale.customer }}</p>
      </div>
      <div class="col-md-6 col-sm-12 col-lg-4 col-xl-3">
        <label class="fw-bold mb-1">{{ $t('sales.payType') }}</label>
        <p class="text-muted mb-0">
          <el-icon>
            <CreditCard
              v-if="
                localValue.sale.pay_type === 'CREDIT_CARD' ||
                localValue.sale.pay_type === 'DEBIT_CARD'
              "
            />
            <Money
              v-if="
                localValue.sale.pay_type === 'CASH' ||
                localValue.sale.pay_type === 'TRANSFER'
              "
            />
            <Iphone v-if="localValue.sale.pay_type === 'TRANSFER'" />
          </el-icon>
          {{ $t(`payTypes.${localValue.sale.pay_type}`) }}
        </p>
      </div>
    </div>
    <div class="mt-2">
      <el-table
        :data="localValue.detail"
        show-summary
        :summary-method="getSummary"
        fit
      >
        <el-table-column
          prop="product.name"
          :label="$t('common.product')"
          align="left"
        ></el-table-column>
        <el-table-column
          prop="units"
          :label="$t('common.units')"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="unity_price"
          :label="$t('common.unitPrice', { symbol })"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="total_price"
          :label="$t('common.totalPrice', { symbol })"
          align="right"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>
