<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { configStore } from '@/stores'

const storeConfig = configStore()
const configElForm = ref()

const currencies = [
  { label: 'Cordoba', value: 'NIO' },
  { label: 'Dolar', value: 'USD' },
  { label: 'Euro', value: 'EUR' },
]

let localValue = ref({
  company: {
    name: '',
    slogan: '',
    address: '',
    phone: '',
    email: '',
    logo: '',
  },
  currency: {
    value: '',
    symbol: '',
  },
  categories: [],
})

onMounted(() => {
  localValue.value = { ...storeConfig.entity }
})

const guardar = () => {
  configElForm.value.validate(valid => {
    if (!valid) return
    if (localValue.value._id) {
      storeConfig.updateConfig(localValue.value)
      return
    }
    storeConfig.createConfig(localValue.value)
  })
}

watch(
  () => storeConfig.entity,
  value => {
    if (value) {
      localValue.value = { ...value }
    }
  }
)

const rules = reactive({})

defineExpose({ guardar })
</script>
<template>
  <el-form
    ref="configElForm"
    :model="localValue"
    :rules="rules"
    label-position="top"
  >
    <el-divider content-position="left">Datos generales</el-divider>
    <div class="row">
      <el-form-item
        label="Nombre"
        prop="company.name"
        class="col-sm-12 col-md-8 col-lg-6 col-xl-6"
      >
        <el-input v-model="localValue.company.name" />
      </el-form-item>
    </div>
    <div class="row">
      <el-form-item
        label="Slogan"
        prop="company.slogan"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <el-input v-model="localValue.company.slogan" />
      </el-form-item>
    </div>
    <div class="row">
      <el-form-item
        label="Dirección"
        prop="company.direccion"
        class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
      >
        <el-input v-model="localValue.company.address" />
      </el-form-item>
    </div>
    <div class="row">
      <el-form-item
        label="Teléfono"
        prop="company.phone"
        class="col-sm-12 col-md-6 col-lg-6 col-xl-6"
      >
        <el-input v-model="localValue.company.phone" />
      </el-form-item>
      <el-form-item
        label="Email"
        prop="company.email"
        class="col-sm-12 col-md-6 col-lg-6 col-xl-6"
      >
        <el-input v-model="localValue.company.email" />
      </el-form-item>
    </div>
    <el-divider content-position="left">Productos</el-divider>
    <el-form-item
      label="Categorías"
      prop="currency.value"
      class="col-sm-12 col-md-12 col-lg-12 col-xl-12"
    >
      <el-select
        v-model="localValue.categories"
        style="width: 100%"
        filterable
        multiple
        allow-create
        default-first-option
      >
        <el-option
          v-for="item in localValue.categories"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-divider content-position="left">Facturación</el-divider>
    <div class="row">
      <el-form-item
        label="Moneda"
        prop="currency.value"
        class="col-sm-12 col-md-6 col-lg-6 col-xl-6"
      >
        <el-select
          v-model="localValue.currency.value"
          style="width: 100%"
          filterable
          placeholder="Moneda"
        >
          <el-option
            v-for="item in currencies"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Símbolo"
        prop="currency.symbol"
        class="col-sm-12 col-md-6 col-lg-6 col-xl-6"
      >
        <el-input v-model="localValue.currency.symbol" />
      </el-form-item>
    </div>
  </el-form>
</template>


<style lang="scss" scoped>
</style>
