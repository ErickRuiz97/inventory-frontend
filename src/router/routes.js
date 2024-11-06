import HomeView from '@/views/HomeView.vue'
import ProductsList from '@/views/products/ProductsList.vue'
import ProductDetail from '@/views/product-detail/ProductDetail.vue'
export const routes = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
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
