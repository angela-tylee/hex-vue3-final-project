import { defineStore } from 'pinia';
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    carts: {},
    cartQty: 0,
    cartLength: 0,
    storeStatus: {
      cartLoading: false,
      addCartLoading: false,
    },
  }),
  actions: {
    getCart() {
      this.storeStatus.cartLoading = true;
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then((response) => {
          this.storeStatus.cartLoading = false;
          this.carts = response.data.data;
          this.cartLength = this.carts.carts.length;
          this.getCartQty();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
          this.storeStatus.cartLoading = false;
        });
    },
    changeCartQty(item, qty = 1) {
      const order = {
        product_id: item.product.id,
        qty,
      };
      axios.put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${item.id}`, { data: order })
        .then(() => {
          this.getCart();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
    getCartQty() {
      this.cartQty = 0;
      this.carts.carts.forEach((cart) => {
        this.cartQty += cart.qty;
      });
    },
    addToCart(product, qty = 1) {
      const order = {
        product_id: product.id,
        qty,
      };
      // this.storeStatus.addCartLoading = order.product_id;
      this.storeStatus.addCartLoading = true;
      axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data: order })
        .then(() => {
          this.storeStatus.addCartLoading = false;
          Swal.fire({
            title: '已加入購物車!',
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          this.getCart();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
          this.storeStatus.addCartLoading = false;
        });
    },
  },
});
