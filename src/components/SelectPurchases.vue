<script setup>
import { onMounted, watch, ref, reactive, computed } from 'vue'
import { objectUtils } from '@/utils'
import { productStore } from '@/stores';
import { Delete } from '@element-plus/icons-vue';
import { Plus } from '@element-plus/icons-vue';

const storeProduct = productStore();
let selectedProducts = ref([]);
const productSelectedElForm = ref();
let products = ref(null)
let product = ref({
  id: "",
  units: 0.0,
  purchase_price: 0.0,
  sale_price: "",
  name: "",
  total_price: 0.0
});

const totalPrice = computed(() => {
  return parseFloat(product.value.purchase_price * product.value.units);
});

onMounted(() => {
  getProducts()
});

function productSelected(id){
  let producto = products.value.filter((producto) => producto._id === id);
  product.value.purchase_price = parseFloat(producto[0].purchase_price);
  product.value.name = producto[0].name;
  product.value.sale_price = parseFloat(producto[0].sale_price);
  product.value.total_price = totalPrice;
}

function getProducts() {
  storeProduct.getProducts(
    objectUtils.cleanQueryEmpties(storeProduct.filters),
  )
};

async function addProduct(){
  const valid = await validForm();
  if (valid) {
    selectedProducts.value.push({...product.value});
    productSelectedElForm.value.resetFields();
    product.value = {
      id: "",
      units: 0.0,
      purchase_price: 0.0,
      sale_price: "",
      name: "",
      total_price: 0.0
    };
  }
}

function deleteProduct(row) {
  const index = selectedProducts.value.indexOf(row);
  if (index !== -1) {
    selectedProducts.value.splice(index, 1);
  }
}

function formatPurchase(value) {
  product.value.purchase_price = value.replace(/[^0-9.]/g, '');
}
function formatSales(value) {
  product.value.sale_price = value.replace(/[^0-9.]/g, '');
}

const rules = reactive({
  id: [
    { required: true, message: 'Por favor selecciona un producto', trigger: 'blur' }
  ],
  units: [
    { required: true, message: 'Por favor ingresa un valor', trigger: ['blur', 'change'] },
    {
      validator: (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('Las unidades deben ser mayores que 0'));
        } else {
          callback();
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
  purchase_price: [
    { required: true, message: 'Por favor ingresa un valor', trigger: ['blur', 'change'] },
    {
      validator: (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('El valor debe ser mayores que 0'));
        } else {
          callback();
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
  sale_price: [
    { required: true, message: 'Por favor ingresa un valor', trigger: ['blur', 'change'] },
    {
      validator: (rule, value, callback) => {
        if (value === 0) {
          callback(new Error('El valor debe ser mayores que 0'));
        } else {
          callback();
        }
      },
      trigger: ['blur', 'change'],
    },
  ],
});

function validForm() {
  return new Promise(resolve => {
    productSelectedElForm.value.validate(valid => {
      resolve(valid)
    })
  })
}

watch(
  () => storeProduct.list,
  value => {
    products.value = value.items;
  }, { deep: true}
)

</script>
<template>
  <div v-if="products != null">
    <el-form
      ref="productSelectedElForm"
      :model="product"
      label-position="top"
      :rules="rules"
    >
    <div class="row">
      <div class="col">
        <el-form-item prop="id" label="Producto">
          <el-select
            v-model="product.id"
            style="width: 100%"
            @change="productSelected"
            filterable
          >
            <el-option
              v-for="item in products"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            />
          </el-select>
        </el-form-item>
      </div>
      <div class="col">
        <el-form-item prop="units" label="Unidad">
          <el-input v-model="product.units" maxlength="3" prop="units" placeholder="Unidades" type="number" controls="false" />
        </el-form-item>
      </div>
      <div class="col">
        <el-form-item prop="purchase_price" label="Precio de compra">
          <el-input v-model="product.purchase_price" maxlength="5" placeholder="Precio de compra" @input="formatPurchase" />
        </el-form-item>
      </div>
      <div class="col">
        <el-form-item prop="sale_price" label="Precio de venta">
          <el-input v-model="product.sale_price" maxlength="5" placeholder="Precio de venta" @input="formatSales" />
        </el-form-item>
      </div>
      <div class="col">
        <el-form-item label="Precio total">
          <el-input v-model="totalPrice" maxlength="5" placeholder="Precio total" disabled />
        </el-form-item>
      </div>
      <div class="col-1">
        <el-form-item label="Acciones">
          <el-button type="primary" @click="addProduct" :icon="Plus" />
        </el-form-item>
      </div>
    </div>
  </el-form>
  <el-table :data="selectedProducts" v-if="selectedProducts.length > 0" style="width: 100%">
      <el-table-column prop="name" label="Producto"></el-table-column>
      <el-table-column prop="units" label="Unidades"></el-table-column>
      <el-table-column prop="purchase_price" label="Precio de compra"></el-table-column>
      <el-table-column prop="sale_price" label="Precio de venta"></el-table-column>
      <el-table-column prop="total_price" label="Precio total"></el-table-column>
      <el-table-column label="Acciones">
        <template #default="{ row }">
              <el-button type="danger" @click="deleteProduct(row)" :icon="Delete" circle>
              </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>