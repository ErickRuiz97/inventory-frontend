<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { rolesUser } from '@/constants'
import { useI18n } from 'vue-i18n'

const userElForm = ref()
const { t } = useI18n()
const route = useRoute()
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {
      return { email: '', password: '', full_name: '', roles: [] }
    },
  },
})
let localValue = ref({
  email: '',
  password: '',
  roles: [],
  full_name: [],
})
let isEdit = ref(false)

onMounted(() => {
  localValue.value = props.modelValue
  isEdit.value = route.params.id ? true : false
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
  email: [
    {
      required: true,
      message: () => t('users.emailRequired'),
      trigger: ['blur', 'change'],
      type: 'email',
    },
  ],
  password: [
    {
      required: true,
      message: () => t('users.passwordRequired'),
      trigger: 'blur',
    },
    {
      min: 5,
      message: () => t('users.passwordMinLength'),
      trigger: 'blur',
    },
  ],
  roles: [
    {
      required: true,
      message: () => t('users.rolesRequired'),
      trigger: 'blur',
    },
  ],
})

function validForm() {
  return userElForm.value.validate(valid => valid)
}
defineExpose({ validForm })
</script>
<template>
  <el-form
    ref="userElForm"
    :model="localValue"
    :rules="rules"
    label-position="top"
  >
    <div class="row">
      <el-form-item
        :label="$t('common.email')"
        prop="email"
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
      >
        <el-input v-model="localValue.email" type="email" :disabled="isEdit" />
      </el-form-item>

      <el-form-item
        :label="$t('users.fullName')"
        prop="full_name"
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
      >
        <el-input v-model="localValue.full_name" />
      </el-form-item>
    </div>
    <div class="row" v-if="!route.params.id">
      <el-form-item
        :label="$t('users.password')"
        prop="password"
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
      >
        <el-input v-model="localValue.password" type="password" show-password />
      </el-form-item>

      <el-form-item
        :label="$t('users.roles')"
        prop="roles"
        class="col-sm-12 col-md-6 col-lg-5 col-xl-4"
      >
        <el-select
          v-model="localValue.roles"
          style="width: 100%"
          multiple
          filterable
        >
          <el-option
            v-for="item in rolesUser"
            :key="item.value"
            :label="$t(item.label)"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>
<style lang="scss" scoped></style>
