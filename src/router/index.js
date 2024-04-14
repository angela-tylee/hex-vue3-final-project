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
      {
        path: 'order',
        name: 'Order',
        component: () => import('../views/front/OrderConfirmView.vue'),
      },
      // 404
      {
        path: '/:pathMatch(.*)*',
        component: () => import('../views/NotFountView.vue'),
      },
    ],
  },
  {
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
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/admin/OrdersView.vue'),
      },
      {
        path: 'blogs',
        name: 'blogs',
        component: () => import('../views/admin/BlogsView.vue'),
      },
      {
        path: 'coupons',
        name: 'coupons',
        component: () => import('../views/admin/CouponsView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  // scrollBehavior(to, savedPosition) {
  //   if (to.hash) {
  //     return {
  //       selector: to.hash,
  //     };
  //   } if (savedPosition) {
  //     return savedPosition;
  //   }
  //   return { x: 0, y: 0 };
  // },
});

export default router;
