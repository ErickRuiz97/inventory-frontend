//General routes
import LoginApp from '@/views/login/LoginApp.vue'
import HomeView from '@/views/HomeView.vue'
import NoAuth from '@/views/noAuth/NoAuth.vue'

// Product routes
import ProductsList from '@/views/products/ProductsList.vue'
import ProductDetail from '@/views/product-detail/ProductDetail.vue'

// Suppliers routes
import SuppliersList from '@/views/suppliers/SuppliersList.vue'
import SupplierDetail from '@/views/supplier-detail/SupplierDetail.vue'

// Users routes
import UsersList from '@/views/users/UsersList.vue'
import UserDetail from '@/views/user-detail/UserDetail.vue'

// Sales routes
import SalesList from '@/views/sales/SalesList.vue'

// Purchases routes
import PurchasesList from '@/views/purchases/PurchasesList.vue'
import PurchaseDetail from '@/views/purcharse-detail/PurchaseDetail.vue'

// Config routes
import ConfigApp from '@/views/config/ConfigApp.vue'

// Change password
import ChangePassword from '@/views/change-password/ChangePassword.vue'

export const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginApp,
    meta: { public: true },
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { breadcrumb: 'Home' },
  },
  {
    path: '/no-auth',
    name: 'NoAuth',
    component: NoAuth,
    props: true,
    meta: {
      breadcrumb: 'No autorizado',
    },
  },
  {
    path: '/config-app',
    name: 'ConfigApp',
    component: ConfigApp,
    props: true,
    meta: {
      breadcrumb: 'Configuración de la aplicación',
      requiresAuth: 'ADMIN',
    },
  },
  //product routes
  {
    path: '/products',
    name: 'ProductsList',
    component: ProductsList,
    meta: {
      breadcrumb: 'Productos',
    },
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: ProductDetail,
    meta: { breadcrumb: 'Crear producto', requiresAuth: ['ADMIN', 'MANAGER'] },
  },
  {
    path: '/products/:id',
    name: 'ProductEdit',
    component: ProductDetail,
    props: true,
    meta: { breadcrumb: 'Editar producto', requiresAuth: ['ADMIN', 'MANAGER'] },
  },
  //user routes
  {
    path: '/users',
    name: 'UserList',
    component: UsersList,
    meta: { breadcrumb: 'Usuarios', requiresAuth: ['ADMIN', 'MANAGER'] },
  },
  {
    path: '/users/create',
    name: 'UserCreate',
    component: UserDetail,
    meta: { breadcrumb: 'Crear usuario', requiresAuth: ['ADMIN', 'MANAGER'] },
  },
  {
    path: '/users/:id',
    name: 'UserUpdate',
    component: UserDetail,
    props: true,
    meta: { breadcrumb: 'Editar usuario', requiresAuth: ['ADMIN', 'MANAGER'] },
  },
  //supplier routes
  {
    path: '/suppliers',
    name: 'SuppliersList',
    component: SuppliersList,
    props: true,
    meta: { breadcrumb: 'Proveedores', requiresAuth: ['ADMIN', 'MANAGER'] },
  },
  {
    path: '/suppliers/create',
    name: 'SupplierCreate',
    component: SupplierDetail,
    meta: { breadcrumb: 'Crear proveedor', requiresAuth: ['ADMIN', 'MANAGER'] },
  },
  {
    path: '/suppliers/:id',
    name: 'SupplierEdit',
    component: SupplierDetail,
    props: true,
    meta: {
      breadcrumb: 'Editar proveedor',
      requiresAuth: ['ADMIN', 'MANAGER'],
    },
  },
  //sales routes
  {
    path: '/sales',
    name: 'SalesList',
    component: SalesList,
    meta: { breadcrumb: 'Ventas' },
  },
  //purchases routes
  {
    path: '/purchases',
    name: 'PurchasesList',
    component: PurchasesList,
    meta: { breadcrumb: 'Compras' },
  },
  {
    path: '/purchases/create',
    name: 'PurchaseCreate',
    component: PurchaseDetail,
    meta: { breadcrumb: 'Registrar compra' },
  },
  {
    path: '/purchases/:id',
    name: 'PurchaseDetail',
    component: PurchaseDetail,
    meta: { breadcrumb: 'Detalle compra' },
  },
  // Change password
  {
    path: '/change-password',
    name: 'ChangePassword',
    component: ChangePassword,
    meta: { breadcrumb: 'Cambiar Contraseña' },
  },
]
