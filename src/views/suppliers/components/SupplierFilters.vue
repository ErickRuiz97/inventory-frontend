<script setup>
import { onMounted, ref, watch } from 'vue'

const supplierQueryElForm = ref()
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})
let localValue = ref({})

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
</script>
<template>
  <el-form ref="supplierQueryElForm" :model="localValue" label-position="top">
    <el-form-item :label="$t('common.code')" prop="code" class="row">
      <el-input v-model="localValue.code" maxlength="8" show-word-limit />
    </el-form-item>
    <el-form-item :label="$t('common.name')" prop="name" class="row">
      <el-input v-model="localValue.name" />
    </el-form-item>
    <el-form-item :label="$t('common.contact')" prop="contact_name" class="row">
      <el-input v-model="localValue.contact_name" />
    </el-form-item>
    <el-form-item :label="$t('common.email')" prop="contact_email" class="row">
      <el-input v-model="localValue.contact_email" />
    </el-form-item>
    <el-form-item :label="$t('common.phone')" prop="contact_phone" class="row">
      <el-input v-model="localValue.contact_phone" />
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped></style>
