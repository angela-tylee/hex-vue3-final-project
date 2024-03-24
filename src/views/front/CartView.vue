<template>
  <div class="container">
    <div class="grid">
      <div class="grid-card shopping-cart bg-secondary-subtle">
        <h2>Shopping Cart</h2>
        <table class="table align-middle"
        style="--bs-table-bg:transparent; --bs-table-color: $primary">
          <thead>
            <tr>
              <th width="50" class="text-center">Item</th>
              <th width="80" class="text-center"></th>
              <th width="50" class="text-center">Price</th>
              <th width="100" class="text-center">Quantity</th>
              <th width="50" class="text-center">Total</th>
              <th width="50" class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cart in carts.carts" :key="cart.id">
              <!-- <td><img :src="cart.product.imageUrl" alt="product-img"
                class="cart-img" ></td> -->
              <!-- <td :style="{backgroundImage: `url(${cart.product.imageUrl})`}"
              style="height: 100 px; width: 100px"></td> -->
              <td class="table-img">
                <img :src="cart.product.imageUrl" alt="" style="width: 100%">
              </td>
              <td class="table-item">
                <RouterLink :to="`/product/${cart.product.id}`">
                  <span>{{ cart.product.title }}</span>
                </RouterLink>
              </td>
              <td class="table-price text-end">${{ cart.product.price }}</td>
              <td class="table-qty text-center">
                <div class="input-group">
                  <button type="button" class="btn btn-outline-secondary"
                  @click="cart.qty--; changeCartQty(cart, cart.qty)"
                  :disabled="cart.qty===1"> - </button>
                    <input type="number" class="form-control text-center"
                    v-model="cart.qty" readonly>
                  <button type="button" class="btn btn-outline-secondary"
                  @click="cart.qty++; changeCartQty(cart, cart.qty)"> + </button>
                </div>
              </td>
              <td class="table-final-price text-end"><span>${{ cart.total }}</span></td>
              <td class="table-delete-btn text-center" style="font-size: 1.5em">
                <button type="button"
                style="border: none; border-radius: 100%; background-color: transparent">
                  <i class="bi bi-x" @click="removeCartItem(cart.id)"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- loading -->
        <div class="loading" v-if="status.cartLoading">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <!-- <p class="text-center" v-if="carts.carts.length === 0">您的購物車沒有東西。</p> -->
        <button type="button" class="btn btn-primary text-cus-cream"
        @click="removeCartItemAll" :disabled="status.removeCartLoading">
        <i class="spinner-border text-cus-cream"
          style="width: 1.2em; height: 1.2em" role="status"
          v-if="status.removeCartLoading">
        </i>
        清空購物車</button>
      </div>
      <div class="grid-card order-summary bg-primary">
        <div class="order-summary-content">
          <h2 class="text-cus-cream">Order Summary</h2>
          <div class="row row-cols-2">
            <div class="col-6 mt-4 text-cus-cream">Subtotal:</div>
            <div class="col-6 mt-4 text-cus-cream text-end">$ {{ carts.total }}</div>
            <div class="col-12 mt-4 text-cus-cream input-group">
              <input type="text" class="form-control" placeholder="Enter SWEETTOOTH2024"
              aria-describedby="button-addon2" v-model="coupon.code">
              <button class="btn btn-secondary text-cus-cream" type="button" id="button-addon2"
              @click.prevent = "applyCoupon(coupon.code)"
              :disabled = "status.couponLoading">
                <i class="spinner-border text-cus-cream"
                  style="width: 1.2em; height: 1.2em" role="status"
                  v-if="status.couponLoading">
                </i>
                Apply
              </button>
            </div>
            <div class="col-12 mt-4">
              <p v-if="coupon.success" class="text-cus-cream">已套用優惠券！</p>
            </div>
            <div class="col-6 mt-4 text-cus-cream fs-5 fw-semibold">Total:</div>
            <div class="col-6 mt-4 text-end fs-5 fw-semibold">
              <span class="text-cus-cream" v-if="coupon.success">$ {{ carts.final_total }}</span>
              <span class="text-cus-cream" v-else>$ {{ carts.total }}</span>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <RouterLink to="/checkout">
            <button type="button" class="btn btn-cus-cream text-primary">
              Proceed to Checkout
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script>
import axios from 'axios';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      carts: {},
      coupon: {
        code: '',
        success: false,
      },
      status: {
        addCartLoading: '',
        removeCartLoading: false,
        cartLoading: false,
        couponLoading: false,
      },
    };
  },
  methods: {
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
          alert(error.response.data.message);
        });
    },
    removeCartItem(id) {
      axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`)
        .then(() => {
          this.getCart();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    removeCartItemAll() {
      this.status.removeCartLoading = true;
      axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/carts`)
        .then(() => {
          this.status.removeCartLoading = false;
          this.getCart();
        })
        .catch((error) => {
          this.status.removeCartLoading = false;
          alert(error.response.data.message);
        });
    },
    getCart() {
      this.status.cartLoading = true;
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then((response) => {
          this.status.cartLoading = false;
          console.log(response);
          this.carts = response.data.data;
        })
        .catch((error) => {
          alert(error.response.data.message);
          this.status.cartLoading = false;
        });
    },
    applyCoupon(couponCode) {
      const coupon = {
        code: couponCode,
      };
      this.status.couponLoading = true;
      axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/coupon`, { data: coupon })
        .then((response) => {
          this.status.couponLoading = false;
          console.log(response);
          this.coupon.success = response.data.success;
        })
        .catch((error) => {
          alert(error.response.data.message);
          this.status.couponLoading = false;
        });
    },
    // createCoupon() {
    //   const coupon = {
    //     title: 'Evergreen Discount',
    //     is_enabled: 1,
    //     percent: 80,
    //     due_date: 2556115199,
    //     code: 'SWEETTOOTH2024',
    //   };
    //   axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon`, { data: coupon })
    //     .then((response) => {
    //       console.log(response);
    //       // this.carts = response.data.data;
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     });
    // },

  },
  mounted() {
    this.getCart();
    // this.createCoupon();
  },
};

</script>

<style scoped>

.container {
  margin-block: 5em;
}

.grid {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1em;
  margin-top: 2em;
  .table {
    margin-top: 2em;
    background-color: transparent;
    a {
      text-decoration: none;
    }
  }
  .grid-card {
    padding: 3em;
    padding-bottom: 5em;
    border-radius: 10px;
  }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner-border {
    margin: 3em;
    width: 5em;
    height: 5em;
    --bs-spinner-border-width: 10px;
  }
}

.cart-img {
  width: 10%;
}

.order-summary {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
    .grid-card {
      padding: 3em;
      padding-bottom: 5em;
      border-radius: 10px;
    }
  }
}

@media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
        display: block;
        border: none;
        text-align: center;
    }
    thead tr {
      display: none;
    }

    .table-img {
      height: 400px;
      overflow: hidden;
      margin-block: 1em;
      img {
        object-fit: cover;
      }
    }

    .table-item,
    .table-price {
      display: inline;
    }

    .table-final-price,
    .table-delete-btn {
      display: none;
    }
}

</style>
