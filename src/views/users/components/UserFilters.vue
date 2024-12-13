<script setup>
import { onMounted, ref, watch } from 'vue'
import { rolesUser } from '@/constants'

const userQueryElForm = ref()
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
  }
)
</script>
<template>
  <el-form ref="userQueryElForm" :model="localValue" label-position="top">
    <el-form-item label="Nombre" prop="full_name" class="row">
      <el-input v-model="localValue.full_name" />
    </el-form-item>
    <el-form-item label="Email" prop="email" class="row">
      <el-input v-model="localValue.email" maxlength="8" show-word-limit />
    </el-form-item>
    <el-form-item label="Roles" prop="roles" class="row">
      <el-select
        v-model="localValue.roles"
        style="width: 100%"
        multiple
        filterable
      >
        <el-option
          v-for="item in rolesUser"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="Estado" prop="state" class="row">
      <el-radio-group v-model="localValue.state">
        <el-radio value="ALL">Todos</el-radio>
        <el-radio value="DESACTIVE">Inactivos</el-radio>
        <el-radio value="ACTIVE">Activos</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<style lang="scss" scoped>
</style>
