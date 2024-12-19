<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([BarChart, CanvasRenderer])

const option = ref({
  textStyle: {
    fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    fontWeight: 300,
  },
  dataset: {
    dimensions: ['Product', '2015', '2016', '2017'],
    source: [
      {
        Product: 'Matcha Latte',
        2015: random(),
        2016: random(),
        2017: random(),
      },
      {
        Product: 'Milk Tea',
        2015: random(),
        2016: random(),
        2017: random(),
      },
      {
        Product: 'Cheese Cocoa',
        2015: random(),
        2016: random(),
        2017: random(),
      },
      {
        Product: 'Walnut Brownie',
        2015: random(),
        2016: random(),
        2017: random(),
      },
    ],
  },
  xAxis: [{ type: 'category' }],
  yAxis: [{}],
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
})

function random() {
  return Math.round(300 + Math.random() * 700) / 10
}
</script>

<template>
  <v-chart :options="option" />
</template>
