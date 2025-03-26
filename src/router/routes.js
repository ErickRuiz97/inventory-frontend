//General routes
import LoginApp from '@/views/login/LoginApp.vue'
import NoAuth from '@/views/no-auth/NoAuth.vue'



// Suppliers routes
import SuppliersList from '@/views/suppliers/SuppliersList.vue'
import SupplierDetail from '@/views/supplier-detail/SupplierDetail.vue'

// Users routes
import UsersList from '@/views/users/UsersList.vue'
import UserDetail from '@/views/user-detail/UserDetail.vue'

// Sales routes
import SalesList from '@/views/sales/SalesList.vue'
import SaleDetail from '@/views/sale-detail/SaleDetail.vue'
// Purchases routes
import PurchasesList from '@/views/purchases/PurchasesList.vue'
import PurchaseDetail from '@/views/purcharse-detail/PurchaseDetail.vue'

// Config routes
import ConfigApp from '@/views/config/ConfigApp.vue'

// Change password
import ChangePassword from '@/views/change-password/ChangePassword.vue'
import DashboardLayout from '@/layout/DashboardLayout.vue'
import HomeDashboard from '@/views/home-dashboard/HomeDashboard.vue'

// Product routes
import ProductsList from '@/views/products/ProductsList.vue'
import ProductDetail from '@/views/product-detail/ProductDetail.vue'
import LoginLayout from '@/layout/LoginLayout.vue'

const dashboardPages = {
  path:"/",
  component: DashboardLayout,
  children: [
    {
      path: '/home',
      name: 'Home',
      component: HomeDashboard,
      meta: { breadcrumb: 'Dashboard' },
    },
  ]
}
const productPages ={
  path : "/products",
  redirect : "/products",
  component : DashboardLayout,
  children : [
    {
      path: '/products',
      name: 'ProductsList',
      component: ProductsList,
      meta: {
        breadcrumb: 'Productos',
      },
    },
    {
      path: 'create',
      name: 'ProductCreate',
      component: ProductDetail,
      meta: { breadcrumb: 'Crear producto', requiresAuth: ['ADMIN', 'MANAGER'] },
    },
    {
      path: ':id',
      name: 'ProductEdit',
      component: ProductDetail,
      props: true,
      meta: { breadcrumb: 'Editar producto', requiresAuth: ['ADMIN', 'MANAGER'] },
    },
  ]
};
const loginPages = {
  path: "/login",
  redirect: "/login",
  component : LoginLayout,
  children: [
    {
      path: '/login',
      name: 'Login',
      component: LoginApp,
      meta: { public: true },
    },
    {
      path: '/change-password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { breadcrumb: 'Cambiar Contraseña' },
    }
  ]
};
const usersPages ={
  path : "/users",
  redirect : "/users",
  component : DashboardLayout,
  children : [
    {
      path: '/users',
      name: 'UserList',
      component: UsersList,
      meta: { breadcrumb: 'Usuarios', requiresAuth: ['ADMIN', 'MANAGER'] },
    },
    {
      path: 'create',
      name: 'UserCreate',
      component: UserDetail,
      meta: { breadcrumb: 'Crear usuario', requiresAuth: ['ADMIN', 'MANAGER'] },
    },
    {
      path: ':id',
      name: 'UserUpdate',
      component: UserDetail,
      props: true,
      meta: { breadcrumb: 'Editar usuario', requiresAuth: ['ADMIN', 'MANAGER'] },
    },
  ]
};
const supplierPages ={
  path : "/suppliers",
  redirect : "/suppliers",
  component : DashboardLayout,
  children : [
    {
      path: '/suppliers',
      name: 'SuppliersList',
      component: SuppliersList,
      props: true,
      meta: { breadcrumb: 'Proveedores', requiresAuth: ['ADMIN', 'MANAGER'] },
    },
    {
      path: 'create',
      name: 'SupplierCreate',
      component: SupplierDetail,
      meta: { breadcrumb: 'Crear proveedor', requiresAuth: ['ADMIN', 'MANAGER'] },
    },
    {
      path: ':id',
      name: 'SupplierEdit',
      component: SupplierDetail,
      props: true,
      meta: {
        breadcrumb: 'Editar proveedor',
        requiresAuth: ['ADMIN', 'MANAGER'],
      },
    },
  ]
};
const salesPages ={
  path : "/sales",
  redirect : "/sales",
  component : DashboardLayout,
  children : [
    {
      path: '/sales',
      name: 'SalesList',
      component: SalesList,
      meta: { breadcrumb: 'Ventas' },
    },
    {
      path: 'create',
      name: 'SaleCreate',
      component: SaleDetail,
      meta: { breadcrumb: 'Registrar venta' },
    },
    {
      path: ':id',
      name: 'SaleDetail',
      component: SaleDetail,
      meta: { breadcrumb: 'Detalle venta' },
    },
  ]
};
const purchasesPages ={
  path : "/purchases",
  redirect : "/purchases",
  component : DashboardLayout,
  children : [
    {
      path: '/purchases',
      name: 'PurchasesList',
      component: PurchasesList,
      meta: { breadcrumb: 'Compras' },
    },
    {
      path: 'create',
      name: 'PurchaseCreate',
      component: PurchaseDetail,
      meta: { breadcrumb: 'Registrar compra' },
    },
    {
      path: ':id',
      name: 'PurchaseDetail',
      component: PurchaseDetail,
      meta: { breadcrumb: 'Detalle compra' },
    },
  ]
};
export const routes = [
  {
    path:"/",
    redirect: '/home',
    name:"Dashboard",
    meta: { public: true },
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
  dashboardPages,
  productPages,
  usersPages,
  supplierPages,
  salesPages,
  purchasesPages,
  loginPages
]
