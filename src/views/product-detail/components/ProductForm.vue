<script setup>
import { onMounted, ref, reactive, watch } from 'vue'

const productElForm = ref()

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return { code: '', name: '', description: '', categories: [] }
    },
  },
})
let localValue = ref({
  code: '',
  name: '',
  description: '',
  categories: [],
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

const categories = [
  { label: 'Comestibles', value: 'COMESTIBLES' },
  { label: 'Limpieza', value: 'LIMPIEZA' },
  { label: 'Bebidas', value: 'BEBIDAS' },
  { label: 'Snacks', value: 'SNACKS' },
  { label: 'Congelados', value: 'CONGELADOS' },
  { label: 'Lácteos', value: 'LACTEOS' },
  { label: 'Panadería', value: 'PANADERIA' },
  { label: 'Carnes frías', value: 'CARNES_FRIAS' },
  { label: 'Frutas y verduras', value: 'FRUTAS_VERDURAS' },
  { label: 'Higiene personal', value: 'HIGIENE_PERSONAL' },
  { label: 'Hogar', value: 'HOGAR' },
  { label: 'Cuidado del bebé', value: 'CUIDADO_BEBE' },
  { label: 'Mascotas', value: 'MASCOTAS' },
  { label: 'Otros', value: 'OTROS' },
  { label: 'Canasta basica', value: 'CANASTA_BASICA' },
  { label: 'Seriales', value: 'SERIALES' },
]

const rules = reactive({
  name: [
    {
      required: true,
      message: 'Por favor ingrese nombre del producto',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: 'Por favor ingrese un código de producto',
      trigger: 'blur',
    },
  ],
})
</script>
<template>
  <div>
    <el-form
      ref="productElForm"
      :model="localValue"
      :rules="rules"
      label-position="top"
    >
      <div class="row">
        <el-form-item
          label="Código"
          prop="code"
          class="col-sm-12 col-md-4 col-lg-3 col-xl-2"
        >
          <el-input v-model="localValue.code" />
        </el-form-item>
        <el-form-item
          label="Nombre"
          prop="name"
          class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
        >
          <el-input v-model="localValue.name" />
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item
          label="Descripción"
          prop="description"
          class="col-sm-12 col-md-5 col-lg-4 col-xl-3"
        >
          <el-input
            v-model="localValue.description"
            type="textarea"
            maxlength="100"
            :autosize="{ minRows: 2, maxRows: 4 }"
            show-word-limit
          />
        </el-form-item>
        <el-form-item
          label="Categorías"
          prop="categories"
          class="col-sm-12 col-md-5 col-lg-4 col-xl-3"
        >
          <el-select
            v-model="localValue.categories"
            style="width: 100%"
            multiple
          >
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<style lang="scss" scoped>
</style>
