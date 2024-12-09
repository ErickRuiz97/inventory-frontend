<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { categories } from '@/constants'

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

function validForm() {
  return productElForm.value.validate(valid => valid)
}
defineExpose({ validForm })
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
          <el-input v-model="localValue.code" maxlength="8" show-word-limit />
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
      </div>
    </el-form>
  </div>
</template>


<style lang="scss" scoped>
</style>
