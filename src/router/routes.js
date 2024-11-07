//General routes
import LoginApp from '@/views/login/LoginApp.vue'
import HomeView from '@/views/HomeView.vue'

//Product routes
import ProductsList from '@/views/products/ProductsList.vue'
import ProductDetail from '@/views/product-detail/ProductDetail.vue'
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
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: { breadcrumb: 'Home' },
  },
  //product routes
  {
    path: '/products',
    name: 'Productos',
    component: ProductsList,
    meta: { breadcrumb: 'Productos' },
  },
  {
    path: '/products/create',
    name: 'Crear producto',
    component: ProductDetail,
    meta: { breadcrumb: 'Crear producto' },
  },
  {
    path: '/products/:id',
    name: 'Editar producto',
    component: ProductDetail,
    props: true,
    meta: { breadcrumb: 'Editar producto' },
  },
]
