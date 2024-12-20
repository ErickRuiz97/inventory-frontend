<script setup>
import moment from 'moment'
import { onMounted, ref, shallowRef, watch } from 'vue'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { SVGRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import { GridComponent } from 'echarts/components'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'

// Registrar los módulos de ECharts
use([
  LineChart,
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
  loading.value = false
})

watch(
  () => props.modelValue,
  value => {
    if (value) {
      localValue.value = value
      option.value = {
        title: {
          text: 'Precio de compra',
          left: 'left',
        },
        tooltip: {
          trigger: 'axis', // Activa el tooltip al pasar por los ejes
        },
        legend: {
          data: localValue.value.map(val => val.year), // Nombres de las líneas
          top: 'bottom',
        },
        xAxis: {
          type: 'category',
          data: obtenerFechasDelAño(2024), // Categorías del eje X
          boundaryGap: false,
          axisLabel: {
            rotate: 90, // Rota las etiquetas 45 grados si son muy largas
          },
        },
        yAxis: {
          type: 'value', // Valores numéricos en el eje Y
        },
        series: formatSeries(localValue.value),
      }
      loading.value = false
    }
  }
)

function formatSeries(contracts) {
  const series = []
  for (const contract of contracts) {
    const serie = {
      name: contract.year,
      type: 'line', // Tipo de gráfico: Línea
      data: makeData(contract.prices), // Datos de la línea para 2024
      smooth: true, // Suaviza la línea
      itemStyle: {
        color: '#5470C6', // Color de la línea
      },
    }
    series.push(serie)
  }
  return series
}

function makeData(prices) {
  const data = []
  for (const price of prices) {
    data.push([price.date, price.price])
  }
  return data
}

function obtenerFechasDelAño(year) {
  const fechas = []
  const inicioDelAño = moment(`${year}-01-01`)
  const finDelAño = moment(`${year}-12-31`)

  let fechaActual = inicioDelAño

  while (fechaActual.isSameOrBefore(finDelAño)) {
    fechas.push(fechaActual.format('DD/MM'))
    fechaActual.add(1, 'day')
  }

  return fechas
}
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
