<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { GridComponent } from 'echarts/components'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'

use([
  BarChart,
  CanvasRenderer,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const option = ref({
  title: {
    text: 'Máximos proveedores',
    left: 'left',
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },

  xAxis: {
    data: ['Latte', 'Espresso', 'Mocha', 'Cappucino'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      type: 'bar',
      data: [100, 50, 25, 10],
    },
  ],
})
</script>

<template>
  <v-chart class="chart" :option="option" autoresize />
</template>
<style scoped>
.chart {
  height: 30vh;
}
</style>
