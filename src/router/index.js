import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/front/AboutView.vue'),
      },
      {
        path: 'products',
        name: 'ProductsList',
        component: () => import('../views/front/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('../views/front/ProductPageView.vue'),
      },
      {
        path: 'blogs',
        name: 'Blogs',
        component: () => import('../views/front/BlogsView.vue'),
      },
      {
        path: 'blog/:id',
        name: 'blog',
        component: () => import('../views/front/BlogView.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('../views/front/CartView.vue'),
      },
      {
        path: 'checkout',
        name: 'Checkout',
        component: () => import('../views/front/CheckoutView.vue'),
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
    component: () => import('../views/admin/DashboardView.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/admin/ProductsView.vue'),
      },
      {
        path: 'product-page',
        name: 'ProductPage',
        component: () => import('../views/admin/ProductPageView.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/admin/OrdersView.vue'),
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import('../views/admin/BlogsView.vue'),
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
