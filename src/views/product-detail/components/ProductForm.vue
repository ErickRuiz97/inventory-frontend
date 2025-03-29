<script setup>
import { Check, Close } from '@element-plus/icons-vue'
import { onMounted, ref, reactive, watch } from 'vue'
import { measures_warranty } from '../../../constants/productConstants'
const productElForm = ref()
import { useConfig } from '@/composables/useConfig'
const { categories } = useConfig()

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        code: '',
        name: '',
        description: '',
        categories: [],
        warranty: {
          has_warranty: false,
          measure: '',
          quantity: '',
        },
      }
    },
  },
})
let localValue = ref({
  code: '',
  name: '',
  description: '',
  categories: [],
  warranty: {
    has_warranty: false,
    measure: '',
    quantity: '',
  },
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
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
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
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
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
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
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
    <div class="row">
      <el-form-item
        label="Garantía"
        prop="warranty.has_warranty"
        class="col-sm-12 col-md-2 col-lg-1 col-xl-1"
      >
        <el-switch
          v-model="localValue.warranty.has_warranty"
          inline-prompt
          :active-icon="Check"
          :inactive-icon="Close"
        />
      </el-form-item>
      <el-form-item
        v-if="localValue.warranty.has_warranty"
        label="Tiempo"
        prop="warranty.measure"
        class="col-sm-12 col-md-6 col-lg-4 col-xl-4"
      >
        <el-select v-model="localValue.warranty.measure" placeholder="">
          <el-option
            v-for="item in measures_warranty"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="localValue.warranty.has_warranty"
        label="Tiempo"
        prop="warranty.quantity"
        class="col-sm-12 col-md-4 col-lg-2 col-xl-2"
      >
        <el-input-number
          v-model.number="localValue.warranty.quantity"
          controls-position="right"
          :min="0"
          style="width: 100%"
        />
      </el-form-item>
    </div>
  </el-form>
</template>


<style lang="scss" scoped>
</style>
