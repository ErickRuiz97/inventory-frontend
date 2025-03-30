<script setup>
import { onMounted, ref, watch } from 'vue'
import { useConfig } from '@/composables/useConfig'

const productQueryElForm = ref()
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
let localValue = ref({})
const { categories } = useConfig()

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
</script>
<template>
  <el-form ref="productQueryElForm" :model="localValue" label-position="top">
    <el-form-item label="Código" prop="code" class="row">
      <el-input v-model="localValue.code" maxlength="8" show-word-limit />
    </el-form-item>
    <el-form-item label="Nombre" prop="name" class="row">
      <el-input v-model="localValue.name" />
    </el-form-item>
    <el-form-item label="Categorías" prop="categories" class="row">
      <el-select
        v-model="localValue.categories"
        style="width: 100%"
        placeholder=" "
        multiple
        filterable
      >
        <el-option
          v-for="item in categories"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="En existencia" prop="stock" class="row">
      <el-radio-group v-model="localValue.stock">
        <el-radio value="ALL">Todos</el-radio>
        <el-radio value="NO_STOCK">Sin existencia</el-radio>
        <el-radio value="IN_STOCK">Con existencias</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
</style>
