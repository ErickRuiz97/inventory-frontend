<script setup>
import { onMounted, ref, watch, shallowRef } from 'vue'
import { use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

use([SVGRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])
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
          text: 'Top 10 más vendido',
          left: 'left',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'right',
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: localValue.value,
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
  height: 60vh;
}
</style>
