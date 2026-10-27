<script setup>
import _ from 'lodash'
import { onMounted, ref, reactive, watch } from 'vue'
import { productStore } from '@/stores'
import { Delete } from '@element-plus/icons-vue'
import { Plus } from '@element-plus/icons-vue'
import { useConfig } from '@/composables/useConfig'
import { useI18n } from 'vue-i18n'

const storeProduct = productStore()
const { symbol } = useConfig()
const { t } = useI18n()

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
  purchase_price: '',
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
    purchase_price: product.purchase_price,
    sale_price: product.sale_price,
    total_price: (product.purchase_price * product.units).toFixed(2),
  }
}

watch(
  () => props.modelValue,
  value => {
    if (value) {
      localValue.value = value
    }
  },
)

function getProducts() {
  storeProduct.getProducts({}, false)
}

async function addProduct() {
  const valid = await validForm()
  if (valid) {
    const contract = makeProduct(product._id)

    const index = localValue.value.findIndex(
      product => product._id == contract._id,
    )

    if (index !== -1) {
      localValue.value[index].purchase_price = contract.purchase_price
      localValue.value[index].sale_price = contract.sale_price
      localValue.value[index].units += contract.units
      localValue.value[index].total_price += (
        contract.purchase_price * localValue.value[index].units
      ).toFixed(2)
    } else {
      localValue.value.push(contract)
    }

    _.merge(product, {
      _id: '',
      units: '',
      purchase_price: '',
      sale_price: '',
    })
    productSelect.value.focus()
  }
}

function setValuesByProduct(val) {
  const entity = storeProduct.list?.items.find(item => item._id === val)
  product.purchase_price = entity.purchase_price
  product.sale_price = entity.sale_price
  unitsInput.value.focus()
}

function deleteProduct(index) {
  localValue.value.splice(index, 1)
}

function getSummary({ columns, data }) {
  const sums = []
  columns.forEach((column, index) => {
    if (column.property === 'sale_price') {
      sums[index] = t('common.total')
    } else if (column.property === 'total_price') {
      const total = data.reduce(
        (sum, row) => sum + Number(row.total_price || 0),
        0,
      )
      sums[index] = `${symbol.value} ${total.toFixed(2)}`
    } else {
      sums[index] = ''
    }
  })
  return sums
}

const rules = reactive({
  _id: [
    {
      required: true,
      message: () => t('validation.selectProduct'),
      trigger: 'blur',
    },
  ],
  units: [
    {
      required: true,
      message: () => t('validation.required'),
      trigger: 'blur',
    },
    {
      type: 'integer',
      message: () => t('validation.mustBeInteger'),
      trigger: 'blur',
    },
    {
      type: 'integer',
      min: 1,
      message: () => t('validation.greaterThanZero'),
      trigger: 'blur',
    },
  ],
  purchase_price: [
    {
      required: true,
      message: () => t('validation.required'),
      trigger: 'blur',
    },
    {
      type: 'number',
      message: () => t('validation.mustBeNumber'),
      trigger: 'blur',
    },
    {
      type: 'number',
      min: 0.01,
      message: () => t('validation.greaterThanZero'),
      trigger: 'blur',
    },
  ],
  sale_price: [
    {
      required: true,
      message: () => t('validation.required'),
      trigger: 'blur',
    },
    {
      type: 'number',
      message: () => t('validation.mustBeNumber'),
      trigger: 'blur',
    },
    {
      type: 'number',
      min: 0.01,
      message: () => t('validation.greaterThanZero'),
      trigger: 'blur',
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
  <el-form
    ref="productSelectedElForm"
    :model="product"
    :rules="rules"
    label-position="top"
    class="row"
  >
    <el-form-item
      prop="_id"
      :label="$t('common.product')"
      class="col-sm-12 col-md-8 col-lg-4 col-xl-4"
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
      :label="$t('common.units')"
      class="col-sm-12 col-md-4 col-lg-2 col-xl-2"
    >
      <el-input
        ref="unitsInput"
        v-model.number="product.units"
        :placeholder="$t('common.units')"
        type="number"
        controls="false"
      />
    </el-form-item>
    <el-form-item
      prop="purchase_price"
      :label="$t('common.purchasePriceWithSymbol', { symbol })"
      class="col-sm-12 col-md-6 col-lg-3 col-xl-3"
    >
      <el-input
        type="number"
        :step="0.01"
        v-model.number="product.purchase_price"
        :placeholder="$t('common.purchasePrice')"
      />
    </el-form-item>
    <el-form-item
      prop="sale_price"
      :label="$t('common.salePriceWithSymbol', { symbol })"
      class="col-sm-12 col-md-6 col-lg-3 col-xl-3"
    >
      <el-input
        type="number"
        :step="0.01"
        v-model.number="product.sale_price"
        :placeholder="$t('common.salePrice')"
      />
    </el-form-item>
    <!-- <div class="col-sm-12 col-md-3 col-lg-2 col-xl-2">
          <el-form-item label="Precio total">
            <el-input
              v-model.number="totalPrice"
              placeholder="Precio total"
              disabled
            />
          </el-form-item>
        </div> -->
  </el-form>
  <div class="row justify-content-center">
    <el-button
      type="primary"
      @click="addProduct"
      :icon="Plus"
      class="col-xl-4 col-lg-5 col-md-10 col-sm-11"
      >{{ $t('common.addProduct') }}</el-button
    >
  </div>
  <div class="mt-2">
    <el-table
      :data="localValue"
      class="tables"
      show-summary
      :summary-method="getSummary"
      :sum-text="$t('common.total')"
      max-height="50vh"
    >
      <el-table-column
        prop="name"
        :label="$t('common.product')"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="units"
        :label="$t('common.units')"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="purchase_price"
        :label="$t('common.purchasePriceWithSymbol', { symbol })"
        width="140"
        align="right"
      ></el-table-column>
      <el-table-column
        prop="sale_price"
        :label="$t('common.salePriceWithSymbol', { symbol })"
        width="130"
        align="right"
      ></el-table-column>
      <el-table-column
        prop="total_price"
        :label="$t('common.totalPrice', { symbol })"
        width="110"
        align="right"
      ></el-table-column>
      <el-table-column :label="$t('common.actions')" width="100" align="center">
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
</template>
