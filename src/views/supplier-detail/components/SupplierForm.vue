<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const supplierElForm = ref()
const { t } = useI18n()

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
  },
)

const rules = reactive({
  name: [
    {
      required: true,
      message: () => t('suppliers.nameRequired'),
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: () => t('suppliers.codeRequired'),
      trigger: 'blur',
    },
  ],
  'contact.email': [
    {
      type: 'email',
      message: () => t('validation.validEmail'),
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
  <el-form
    ref="supplierElForm"
    :model="localValue"
    :rules="rules"
    label-position="top"
  >
    <div class="row">
      <el-form-item
        :label="$t('common.code')"
        prop="code"
        class="col-sm-12 col-md-5 col-lg-4 col-xl-3"
      >
        <el-input v-model="localValue.code" maxlength="8" show-word-limit />
      </el-form-item>
      <el-form-item
        :label="$t('common.name')"
        prop="name"
        class="col-sm-12 col-md-7 col-lg-6 col-xl-5"
      >
        <el-input v-model="localValue.name" />
      </el-form-item>
    </div>
    <div class="row">
      <el-form-item
        :label="$t('common.contact')"
        prop="contact.name"
        class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
      >
        <el-input v-model="localValue.contact.name" />
      </el-form-item>
      <el-form-item
        :label="$t('common.email')"
        prop="contact.email"
        class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
      >
        <el-input v-model="localValue.contact.email" />
      </el-form-item>
      <el-form-item
        :label="$t('common.phone')"
        prop="contact.phone"
        class="col-sm-12 col-md-6 col-lg-2 col-xl-2"
      >
        <el-input v-model="localValue.contact.phone" />
      </el-form-item>
    </div>
  </el-form>
</template>

<style lang="scss" scoped></style>
