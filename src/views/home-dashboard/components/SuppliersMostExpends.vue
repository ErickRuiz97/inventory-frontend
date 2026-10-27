<script setup>
import { onMounted, ref, watch, shallowRef, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { GridComponent } from 'echarts/components'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import { useConfig } from '@/composables/useConfig'
const { symbol } = useConfig()

use([
  BarChart,
  SVGRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])
const { t, locale } = useI18n()
const loading = shallowRef(true)
let props = defineProps({
  modelValue: {
    type: Array,
    default: () => {
      return []
    },
  },
})
let localValue = ref([])
const loadingOptions = computed(() => ({
  text: t('common.loading'),
  color: '#485EBDFF',
  maskColor: 'rgba(255, 255, 255, 0.4)',
}))

const option = shallowRef()

onMounted(() => {
  localValue.value = props.modelValue
})

watch([() => props.modelValue, locale], ([value]) => {
  if (value) {
    localValue.value = value
    loading.value = false
    option.value = {
      title: {
        text: t('dashboard.topSuppliers'),
        left: 'left',
      },
      tooltip: {
        trigger: 'item',
        formatter: `{b} : {c} (${symbol.value})`,
      },
      itemStyle: {
        borderRadius: [20, 20, 0, 0],
      },
      xAxis: {
        data: localValue.value.map(item => item.name),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: localValue.value.map(item => item.value),
        },
      ],
    }
  }
})
</script>

<template>
  <v-chart
    class="chart"
    :option="option"
    :loadingOptions="loadingOptions"
    :loading="loading"
    autoresize
  />
</template>
<style scoped>
.chart {
  height: 60vh;
}
</style>
