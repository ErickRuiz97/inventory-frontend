import HomeView from '@/views/HomeView.vue'
import ProductsList from '@/views/products/ProductsList.vue'
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
  },
  {
    path: '/products',
    name: 'Productos',
    component: ProductsList,
  },
]
