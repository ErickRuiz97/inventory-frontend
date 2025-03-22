//General routes
import LoginApp from '@/views/login/LoginApp.vue'
//import NoAuth from '@/views/no-auth/NoAuth.vue'


/* 
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
import ChangePassword from '@/views/change-password/ChangePassword.vue' */
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
  ]
}
export const routes = [
  {
    path:"/",
    redirect: '/home',
    name:"Dashboard",
    meta: { public: true },
  },
  dashboardPages,
  productPages,
  loginPages
]
