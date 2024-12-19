<script setup>
import { ref } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { GridComponent } from 'echarts/components'

// Registrar los módulos de ECharts
use([LineChart, CanvasRenderer, GridComponent])

// Configuración del gráfico
const option = ref({
  title: {
    text: 'Tendencia de Ventas',
    left: 'center',
  },
  tooltip: {
    trigger: 'axis', // Activa el tooltip al pasar por los ejes
  },
  legend: {
    data: ['2023', '2024'], // Nombres de las líneas
    top: 'bottom',
  },
  xAxis: {
    type: 'category',
    data: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], // Categorías del eje X
  },
  yAxis: {
    type: 'value', // Valores numéricos en el eje Y
  },
  series: [
    {
      name: '2023',
      type: 'line', // Tipo de gráfico: Línea
      data: [150, 230, 224, 218, 135, 147], // Datos de la línea para 2023
      smooth: true, // Suaviza la línea
      itemStyle: {
        color: '#5470C6', // Color de la línea
      },
    },
    {
      name: '2024',
      type: 'line', // Tipo de gráfico: Línea
      data: [180, 210, 190, 250, 220, 300], // Datos de la línea para 2024
      smooth: true, // Suaviza la línea
      itemStyle: {
        color: '#91CC75', // Color de la línea
      },
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
