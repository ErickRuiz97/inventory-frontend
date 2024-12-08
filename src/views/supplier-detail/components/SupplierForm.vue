<script setup>
import { onMounted, ref, reactive, watch } from 'vue'

const supplierElForm = ref()

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return {
        name: '',
        code: '',
        contact: {
          name: '',
          email: '',
          phone: '',
        },
      }
    },
  },
})
let localValue = ref({
  name: '',
  code: '',
  contact: {
    name: '',
    email: '',
    phone: '',
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
      message: 'Por favor ingrese nombre del proveedor',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: 'Por favor ingrese un código de proveedor',
      trigger: 'blur',
    },
  ],
  'contact.email': [
    {
      type: 'email',
      message: 'Ingrese una email valido',
      trigger: 'blur',
    },
  ],
})

function validForm() {
  return supplierElForm.value.validate(valid => valid)
}
defineExpose({ validForm })
</script>
<template>
  <div>
    <el-form
      ref="supplierElForm"
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
          label="Contacto"
          prop="contact.name"
          class="col-sm-12 col-md-5 col-lg-4 col-xl-3"
        >
          <el-input v-model="localValue.contact.name" />
        </el-form-item>
        <el-form-item
          label="Email"
          prop="contact.email"
          class="col-sm-12 col-md-5 col-lg-4 col-xl-3"
        >
          <el-input v-model="localValue.contact.email" />
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item
          label="Teléfono"
          prop="contact.phone"
          class="col-sm-12 col-md-5 col-lg-4 col-xl-3"
        >
          <el-input v-model="localValue.contact.phone" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<style lang="scss" scoped>
</style>
