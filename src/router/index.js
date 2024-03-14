import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/AboutView.vue'),
      },
      {
        path: 'products',
        name: 'Product',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/CartView.vue'),
      },
    ],
  },
  {
    // Log-in Page 通常沒有導覽列，所以可以獨立建立一個路由
    path: '/log-in',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/dashboard/DashboardView.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/dashboard/ProductsView.vue'),
      },
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/dashboard/OrderView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
