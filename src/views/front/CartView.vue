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
              <td><img :src="cart.product.imageUrl" alt="" style="width: 100%"></td>
              <td>{{ cart.product.title }}</td>
              <td class="text-end">${{ cart.product.price }}</td>
              <td class="text-center">
                <div class="input-group">
                  <button class="btn btn-outline-secondary" type="button"> - </button>
                    <input type="number" class="form-control text-center" v-model="cart.qty">
                  <button class="btn btn-outline-secondary" type="button"> + </button>
                </div>
              </td>
              <td class="text-end">${{ cart.total }}</td>
              <td class="text-center" style="font-size: 1.5em"><i class="bi bi-x"></i></td>
            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-primary text-cus-cream">清空購物車</button>
      </div>
      <div class="grid-card order-info bg-primary">
        <div class="order-info-content">
          <h2 class="text-cus-cream">Order Info</h2>
          <div class="row row-cols-2">
            <div class="col-6 mt-4 text-cus-cream">Total Quantity:</div>
            <div class="col-6 mt-4 text-cus-cream text-end"></div>
            <div class="col-6 mt-4 text-cus-cream">Subtotal:</div>
            <div class="col-6 mt-4 text-cus-cream text-end">$ {{ carts.total }}</div>
            <div class="col-12 mt-4 text-cus-cream input-group">
              <input type="text" class="form-control" placeholder="Enter Coupon Code"
              aria-label="Recipient's username" aria-describedby="button-addon2">
              <button class="btn btn-secondary text-cus-cream" type="button" id="button-addon2">
                Apply
              </button>
            </div>
            <div class="col-6 mt-4 text-cus-cream fs-5 fw-semibold">Total:</div>
            <div class="col-6 mt-4 text-cus-cream text-end fs-5 fw-semibold">
              $ {{ carts.final_total }}</div>
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
// const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;

// const { required, email, min, max } = VeeValidateRules;

// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);
// defineRule('max', max);
import axios from 'axios';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      carts: {},
      status: {
        addCartLoading: '',
        cartQtyLoading: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    // changeCartQty(item, qty = 1) {
    //   const order = {
    //     product_id: item.product.id,
    //     qty,
    //   };
    //   this.status.cartQtyLoading = item.id;
    //   axios.put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${item.id}`, { data: order })
    //     .then((response) => {
    //       this.status.cartQtyLoading = '';
    //       this.getCart();
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     });
    // },
    // removeCartItem(id) {
    //   this.status.cartQtyLoading = id;
    //   axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${id}`)
    //     .then((response) => {
    //       this.status.cartQtyLoading = '';
    //       this.getCart();
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     });
    // },
    // removeCartItemAll() {
    //   axios.delete(`${VITE_API_URL}/api/${VITE_API_PATH}/carts`)
    //     .then((response) => {
    //       this.getCart();
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     });
    // },
    getCart() {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then((response) => {
          console.log(response);
          this.carts = response.data.data;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    // createOrder() {
    //   const order = this.form;
    //   axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/order`, { data: order })
    //     .then((response) => {
    //       alert(response.data.message);
    //       this.$refs.form.resetForm();
    //       this.getCart();
    //     })
    //     .catch((error) => {
    //       alert(error.response.data.message);
    //     });
    // },
  },
  // components: {
  //   userProductModal,
  //   VForm: Form,
  //   VField: Field,
  //   ErrorMessage: ErrorMessage,
  // },
  mounted() {
    this.getCart();
    console.log(this.carts);
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
  }
  .grid-card {
    padding: 3em;
    padding-bottom: 5em;
    border-radius: 10px;
  }
}

.cart-img {
  width: 10%;
}

.order-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

</style>
