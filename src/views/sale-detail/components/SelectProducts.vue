<script setup>
import _ from 'lodash'
import { onMounted, watch, ref, reactive } from 'vue'
import { productStore } from '@/stores'
import { Delete } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'

const storeProduct = productStore()
let props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
})
let localValue = ref([])
const unitsInput = ref()
const productSelect = ref()
const productSelectedElForm = ref()
let product = reactive({
  _id: '',
  units: '',
  sale_price: '',
})

onMounted(() => {
  localValue.value = props.modelValue
  getProducts()
})

function makeProduct(val) {
  const entity = storeProduct.list?.items.find(item => item._id === val)
  return {
    _id: entity._id,
    name: `${entity.code} ${entity.name}`,
    units: product.units,
    sale_price: product.sale_price,
    total_price: product.sale_price * product.units,
  }
}

watch(
  () => props.modelValue,
  value => {
    if (value) {
      localValue.value = value
    }
  }
)

function getProducts() {
  storeProduct.getProducts({ stock: 'IN_STOCK' }, false)
}

async function addProduct() {
  const valid = await validForm()
  if (valid) {
    localValue.value.push(makeProduct(product._id))
    productSelectedElForm.value.resetFields()
    _.merge(product, {
      _id: '',
      units: '',
      sale_price: '',
    })
    productSelect.value.focus()
  }
}

function setValuesByProduct(val) {
  const entity = storeProduct.list?.items.find(item => item._id === val)
  product.sale_price = entity.sale_price
  unitsInput.value.focus()
}

function deleteProduct(index) {
  localValue.value.splice(index, 1)
}

const rules = reactive({
  _id: [
    {
      required: true,
      message: 'Por favor selecciona un producto',
      trigger: 'blur',
    },
  ],
  sale_price: [
    {
      required: true,
      message: 'Por favor ingresa un valor',
      trigger: 'blur',
    },
    { type: 'number', message: 'Debe ser un número', trigger: 'blur' },
    {
      type: 'number',
      min: 0.01,
      message: 'Debe ser mayor que 0',
      trigger: 'blur',
    },
  ],
  units: [
    {
      required: true,
      message: 'Por favor ingresa un valor',
      trigger: ['blur', 'change'],
    },
    {
      validator: (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('Las unidades deben ser mayores que 0'))
        } else {
          callback()
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
})

function validForm() {
  return new Promise(resolve => {
    productSelectedElForm.value.validate(valid => {
      resolve(valid)
    })
  })
}
</script>
<template>
  <div class="">
    <el-form
      ref="productSelectedElForm"
      :model="product"
      label-position="top"
      :rules="rules"
      class="row"
    >
      <el-form-item
        prop="_id"
        label="Producto"
        class="col-sm-12 col-md-5 col-lg-4 col-xl-4"
      >
        <el-select
          ref="productSelect"
          v-model="product._id"
          @change="setValuesByProduct"
          style="width: 100%"
          filterable
        >
          <el-option
            v-for="item in storeProduct.list?.items"
            :key="item._id"
            :label="`${item.code} - ${item.name}`"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        prop="units"
        label="Unidades"
        class="col-sm-12 col-md-4 col-lg-3 col-xl-3"
      >
        <el-input
          ref="unitsInput"
          v-model.number="product.units"
          placeholder="Unidades"
          type="number"
          controls="false"
        />
      </el-form-item>
      <el-form-item
        prop="sale_price"
        label="Precio de venta"
        class="col-sm-12 col-md-5 col-lg-4 col-xl-4"
      >
        <el-input
          v-model.number="product.sale_price"
          placeholder="Precio de venta"
          disabled
        />
      </el-form-item>
      <el-form-item label="" class="col-1 mt-4">
        <el-button type="primary" @click="addProduct" :icon="Plus" />
      </el-form-item>
    </el-form>
    <div class="mt-5">
      <el-table :data="localValue" class="tables" show-summary>
        <el-table-column
          prop="_id"
          label="Producto"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="units"
          label="Unidades"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sale_price"
          label="Precio de venta"
          width="120"
          align="right"
        ></el-table-column>
        <el-table-column
          prop="total_price"
          label="Precio total"
          width="100"
          align="right"
        ></el-table-column>
        <el-table-column label="Acciones" width="100" align="center">
          <template #default="scope">
            <el-button
              type="danger"
              @click="deleteProduct(scope.$index)"
              :icon="Delete"
              circle
            >
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
