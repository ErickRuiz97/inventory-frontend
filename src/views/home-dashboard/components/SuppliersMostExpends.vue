<script setup>
import { onMounted, ref, watch, shallowRef } from 'vue'
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

use([
  BarChart,
  SVGRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])
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
const loadingOptions = {
  text: 'Cargando…',
  color: '#485EBDFF',
  maskColor: 'rgba(255, 255, 255, 0.4)',
}

const option = shallowRef()

onMounted(() => {
  localValue.value = props.modelValue
})

watch(
  () => props.modelValue,
  value => {
    if (value) {
      localValue.value = value
      loading.value = false
      option.value = {
        title: {
          text: 'Máximos proveedores',
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} (C$)',
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
  }
)
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
  height: 30vh;
}
</style>
