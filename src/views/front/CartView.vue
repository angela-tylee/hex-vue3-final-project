<template>
  <div class="container">
    <!-- Stepper -->
    <div class="stepper-container">
      <div class="stepper">
        <div class="step">
          <RouterLink to="/products">
            <div class="step-circle bg-primary text-cus-cream">1</div>
          </RouterLink>
          <span class="">{{ $t('stepper.shopping') }}</span>
        </div>
        <div class="step">
          <div class="step-circle active">2</div>
          <span>{{ $t('stepper.cart') }}</span>
        </div>
        <div class="step">
          <div class="step-circle">3</div>
          <span>{{ $t('stepper.checkout') }}</span>
        </div>
        <div class="step">
          <div class="step-circle">4</div>
          <span>{{ $t('stepper.confirm') }}</span>
        </div>
      </div>
      <div class="stepper-line"></div>
    </div>
    <!--  -->
    <div class="grid">
      <div class="grid-card shopping-cart bg-secondary-subtle">
        <h2>{{ $t('cart.shopping-cart') }}</h2>
        <table class="table align-middle"
        style="--bs-table-bg:transparent; --bs-table-color: $primary">
          <thead>
            <tr>
              <th width="15%" class="text-center">{{ $t('cart.item') }}</th>
              <th width="30%" class="text-center"></th>
              <th width="10%" class="text-center">{{ $t('cart.price') }}</th>
              <th width="25%" class="text-center">{{ $t('cart.quantity') }}</th>
              <th width="15%" class="text-end">{{ $t('cart.total') }}</th>
              <th width="5%" class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cart in carts.carts" :key="cart.id">
              <td class="table-img">
                <img :src="cart.product.imageUrl" alt="product-img" style="width: 100%">
              </td>
              <td class="table-item">
                <RouterLink :to="`/product/${cart.product.id}`">
                  <span v-if=" $i18n.locale === 'zh-TW' ">{{ cart.product.title }}</span>
                  <span v-if=" $i18n.locale === 'en' ">{{ cart.product.en.title }}</span>
                </RouterLink>
              </td>
              <td class="table-price text-center">${{ cart.product.price }}</td>
              <td class="table-qty text-center">
                <div class="input-group">
                  <button type="button" class="btn btn-outline-secondary"
                  @click="cart.qty--; changeCartQty(cart, cart.qty)"
                  :disabled="cart.qty===1"> - </button>
                    <input type="text" class="form-control text-center"
                    v-model="cart.qty" readonly>
                  <button type="button" class="btn btn-outline-secondary"
                  @click="cart.qty++; changeCartQty(cart, cart.qty)"> + </button>
                </div>
              </td>
              <td class="table-final-price text-end"><span>${{ cart.total }}</span></td>
              <td class="table-delete-btn text-end" style="font-size: 1.5em">
                <button type="button"
                style="border: none; border-radius: 100%; background-color: transparent">
                  <i class="bi bi-x" @click="removeCartItem(cart.id)"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- loading -->
        <div class="loading" v-if="storeStatus.cartLoading">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <!--  -->
        <p class="text-center mt-5 cart-empty" v-if="cartLength === 0">
          {{ $t('cart.cart-empty') }} <br>
          <RouterLink to="/products">{{ $t('cart.continue-shopping') }} >></RouterLink>
        </p>
        <button type="button" class="btn btn-primary text-cus-cream"
          v-if="cartLength !== 0"
          @click="openModal" :disabled="status.removeCartLoading">
          <i class="spinner-border text-cus-cream"
            style="width: 1.2em; height: 1.2em" role="status"
            v-if="status.removeCartLoading">
          </i>
          {{ $t('cart.remove-cart-all') }}
        </button>
      </div>
      <div class="grid-card order-summary bg-primary">
        <div class="order-summary-content">
          <h2 class="text-cus-cream">{{ $t('cart.order-summary') }}</h2>
          <div class="row row-cols-2">
            <div class="col-8 mt-4 text-cus-cream">{{ $t('cart.total-qty') }}:</div>
            <div class="col-4 mt-4 text-cus-cream text-end">{{ cartQty }}</div>
            <div class="col-6 mt-4 text-cus-cream">{{ $t('cart.subtotal') }}:</div>
            <div class="col-6 mt-4 text-cus-cream text-end">$ {{ carts.total }}</div>
            <div class="col-12 mt-4 text-cus-cream">{{ $t('cart.discount') }}: </div>
            <div class="col-12 mt-2 text-cus-cream input-group">
              <input type="text" class="form-control" placeholder="Enter SWEETTOOTH2024"
              aria-describedby="button-addon2" v-model="coupon.code">
              <button class="btn btn-secondary text-cus-cream" type="button" id="button-addon2"
              @click.prevent = "applyCoupon(coupon.code)"
              :disabled = "status.couponLoading || coupon.code === ''">
                <i class="spinner-border text-cus-cream"
                  style="width: 1.2em; height: 1.2em" role="status"
                  v-if="status.couponLoading">
                </i>
                {{ $t('cart.apply-discount') }}
              </button>
            </div>
            <div class="col-12 mt-4">
              <p v-if="coupon.success" class="text-cus-cream">{{ $t('cart.coupon-applied') }}</p>
            </div>
            <div class="col-6 mt-4 text-cus-cream fs-5 fw-semibold">
              {{ $t('cart.final-total') }}:
            </div>
            <div class="col-6 mt-4 text-end fs-5 fw-semibold">
              <span class="text-cus-cream" v-if="coupon.success">$ {{ carts.final_total }}</span>
              <span class="text-cus-cream" v-else>$ {{ carts.total }}</span>
            </div>
          </div>
        </div>
        <div class="col-12 mt-4">
          <button type="button" class="btn btn-cus-cream text-primary"
          :disabled="cartLength === 0">
            <RouterLink to="/checkout">
            {{ $t('cart.checkout') }}
            </RouterLink>
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-primary text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span class="text-white">清空購物車</span>
            </h5>
            <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否清空購物車
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="removeCartItemAll">
              確認清空
            </button>
          </div>
        </div>
      </div>-
    </div>
    <!-- Modal -->
    <RouterView></RouterView>
  </div>
</template>

<script>
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';
import { mapState, mapActions } from 'pinia';
import cartStore from '../../stores/cartStore';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

let removeCartAllModal = '';

export default {
  data() {
    return {
      // carts: {},
      // cartQty: 0,
      // cartLength: '',
      coupon: {
        code: '',
        success: false,
      },
      status: {
        // addCartLoading: '',
        removeCartLoading: false,
        // cartLoading: false,
        couponLoading: false,
      },
    };
  },
  watch: {
    '$i18n.locale': {
      handler() {
        this.getCart();
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(cartStore, ['carts', 'cartQty', 'cartLength', 'storeStatus']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'changeCartQty', 'getCartQty']),
    // getCart() {
    //   this.status.cartLoading = true;
    //   axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
    //     .then((response) => {
    //       this.status.cartLoading = false;
    //       console.log(response);
    //       this.carts = response.data.data;
    //       this.cartLength = this.carts.carts.length;
    //       this.getCartQty();
    //     })
    //     .catch((error) => {
    //       Swal.fire({
    //         title: error.response.data.message,
    //         confirmButtonColor: 'var(--bs-danger)',
    //       });
    //       this.status.cartLoading = false;
    //     });
    // },
    // changeCartQty(item, qty = 1) {
    //   const order = {
    //     product_id: item.product.id,
    //     qty,
    //   };
    //   axios.put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${item.id}`, { data: order })
    //     .then(() => {
    //       this.getCart();
    //     })
    //     .catch((error) => {
    //       Swal.fire({
    //         title: error.response.data.message,
    //         confirmButtonColor: 'var(--bs-danger)',
    //       });
    //     });
    // },
    // getCartQty() {
    //   this.cartQty = 0;
    //   this.carts.carts.forEach((cart) => {
    //     this.cartQty += cart.qty;
    //   });
    // },
    removeCartItem(id) {
      axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`)
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
    removeCartItemAll() {
      this.status.removeCartLoading = true;
      axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/carts`)
        .then(() => {
          Swal.fire({
            title: '已清空購物車！',
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          removeCartAllModal.hide();
          this.status.removeCartLoading = false;
          this.getCart();
        })
        .catch((error) => {
          this.status.removeCartLoading = false;
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
    openModal() {
      removeCartAllModal.show();
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
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
          this.status.couponLoading = false;
        });
    },
  },
  mounted() {
    this.getCart();
    removeCartAllModal = new bootstrap.Modal(document.getElementById('delProductModal'));
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
  margin-top: 4em;
  .table {
    margin-top: 2em;
    background-color: transparent;
    a {
      text-decoration: none;
    }
  }
  .grid-card {
    padding: 3em 2em 5em;
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

.order-summary {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

button a {
  text-decoration: none;
}

.table-img{
  height: 80px;
  overflow: hidden;
  margin-block: 1em;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
}

/* stepper */
.stepper-container {
  position: relative;
}

.stepper {
  display: flex;
  justify-content: space-between;
  margin-inline: 8%;
}

.stepper-line {
  border: 1px solid var(--bs-secondary-bg-subtle);
  width: 100%;
  margin: 1em 0;
  position: absolute;
  top: 10%;
  z-index: -10;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  span {
    margin-top: 1em;
  }
}

.step-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2px;
  background-color: var(--bs-secondary-bg-subtle);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-weight: 700;
}

.step-circle.active {
  box-shadow: 0 0 0 8px var(--bs-secondary-border-subtle);
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .container {
    margin-block: 1em;
  }
  .grid {
    .grid-card {
      padding: 1.5em;
    }
  }
  thead tr {
    width: 100%;
    th:nth-of-type(1) {
      width: 30%;
    }
    th:nth-of-type(2) {
      display: none;
    }
    th:nth-of-type(3) {
      width: 10%;
    }
    th:nth-of-type(4) {
      width: 40%;

    }
    th:nth-of-type(5) {
      width: 10%;

    }
    th:nth-of-type(6) {
      width: 5%;
    }
  }
  th, td {
    padding-inline: 0;
  }
  .input-group {
    padding-inline: 1em;
  }
  .table-img {
    display: none;
  }
  .table-item {
    text-align: center;
  }
}

@media (max-width: 576px) {
  .grid {
    .grid-card{
      padding-inline: 1em;
    }
  }
  thead tr {
    th:nth-of-type(5){
      display: none;
    }
  }
  .table-final-price {
    display: none;
  }
}
</style>
