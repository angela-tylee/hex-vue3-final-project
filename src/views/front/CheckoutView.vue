<template>
  <div class="container">
    <div class="content bg-secondary-subtle">
      <h2>Checkout</h2>
      <div class="checkout-grid">
        <div class="contact-info">
          <div class="contact-info-form mb-5 row justify-content-center">
            <v-form ref="form" v-slot="{ errors }" @submit="createOrder">
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <v-field id="email" name="email" type="email" class="form-control"
                :class="{'is-invalid': errors['email'] }"
                  placeholder="請輸入 Email" rules="email|required" v-model="form.user.email">
                </v-field>
                <error-message name="email" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label">收件人姓名</label>
                <v-field id="name" name="姓名" type="text" class="form-control"
                :class="{'is-invalid': errors['姓名'] }"
                  placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
                <error-message name="姓名" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="tel" class="form-label">收件人電話</label>
                <v-field id="tel" name="電話" type="text" class="form-control"
                :class="{'is-invalid': errors['電話'] }"
                  placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel">
                </v-field>
                <error-message name="電話" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">收件人地址</label>
                <v-field id="address" name="地址" type="text" class="form-control"
                :class="{'is-invalid': errors['地址'] }"
                  placeholder="請輸入地址" rules="required" v-model="form.user.address"></v-field>
                <error-message name="地址" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="message" class="form-label">備註</label>
                <textarea id="message" class="form-control" cols="30" rows="10"
                v-model="form.message"></textarea>
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-primary">送出訂單</button>
              </div>
            </v-form>
          </div>
        </div>
        <div class="order-info">
          <h4 class="mb-4">Your Order</h4>
          <div class="order-detail">
            <div class="row row-cols-2">
              <div class="col-12">Item</div>
              <!-- loading -->
              <div class="col-12 loading" v-if="status.cartLoading">
                <div class="spinner-border text-primary" role="status"></div>
              </div>
              <div class="col-12 row row-cols-2 order-item-flex"
                v-for="cart in carts.carts" :key="cart.id">
                <div class="col-5 order-img">
                  <img :src="cart.product.imageUrl" alt="product-img" style="width: 100%">
                </div>
                <div class="col-7">
                  <RouterLink :to="`/product/${cart.product.id}`">
                    <span>{{ cart.product.title }}</span>
                  </RouterLink>
                  <span> x {{ cart.qty }}</span>
                </div>
              </div>
              <div class="col-6 mt-4">Subtotal</div>
              <div class="col-6 mt-4 text-end"> $ {{ carts.total }}</div>
              <div class="col-6 mt-2 fs-5 fw-semibold">Total:</div>
              <div class="col-6 mt-2 text-end fs-5 fw-semibold">
                $ {{ carts.final_total }} </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script>

import {
  Field as VField, Form as VForm, ErrorMessage, defineRule, configure,
} from 'vee-validate';

import * as AllRules from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import axios from 'axios';
import Swal from 'sweetalert2';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      carts: {},
      form: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      status: {
        cartLoading: false,
      },
    };
  },
  methods: {
    createOrder() {
      const order = this.form;
      axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/order`, { data: order })
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          this.$refs.form.resetForm();
          this.$router.push('/');
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
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
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
          this.status.cartLoading = false;
        });
    },
  },
  components: {
    VForm,
    VField,
    ErrorMessage,
  },
  mounted() {
    this.getCart();
  },
};

</script>

<style scoped>

.container {
  margin-block: 5em;
}

.content {
  padding: 2em;
  border-radius: 20px;
}

.checkout-grid {
  display: grid;
  grid-template-columns: 8fr 4fr;
  grid-gap: 2em;
}

.contact-info {
  h3 {
    margin-top: 1em;
  }
}

.contact-info-form {
  padding-top: 1.5em;
}

.order-info {
  h3 {
    margin-top: 1em;
  }
}

.order-detail {
  border: solid 1px;
  border-radius: 10px;
  padding: 2em;
}

.order-item-flex {
  display: flex;
  align-items: center;
  a {
    text-decoration: none;
  }
}

.order-img{
  height: 40px;
  overflow: hidden;
  margin-block: 0.5em;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }
}

.loading {
  text-align: center;
}

@media (max-width: 1024px) {
  .checkout-grid {
    grid-template-columns: 1fr;
    .contact-info {
      grid-row: 2;
    }
    .order-info{
      margin-top: 2em;
    }
  }
  .order-img{
  height: 120px;
  }
}

@media (max-width: 768px) {
  .order-img{
  height: 80px;
  }
}

</style>
