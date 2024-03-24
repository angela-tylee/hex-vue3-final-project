<template>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/products">Desserts</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>
    <div class="product-grid">
      <div class="product-img img-container">
        <img :src="product.imageUrl" alt="product-img">
      </div>
      <div class="product-content">
        <div>
          <h2>{{ product.title }}</h2>
          <span>{{ product.category }}</span>
          <h4>PRODUCT DESCRIPTION</h4>
          <p>{{ product.description }}</p>
        </div>
        <div>
          <div class="quantity-block">
            <!-- <div class="input-group">
              <button class="btn btn-outline-secondary" type="button"
              @click="value--" :disabled="value===1"> - </button>
              <input type="number" class="form-control text-center"
              value="1" readonly>
              <button class="btn btn-outline-secondary" type="button"
              @click="value++"> + </button>
            </div> -->
            <div class="input-group">
              <button class="btn btn-outline-secondary" type="button"
              @click="qty--; changeQty(qty)" :disabled="qty === 1"> - </button>
                <input type="number" class="form-control text-center"
                value="1" v-model="qty" readonly>
              <button class="btn btn-outline-secondary" type="button"
              @click="qty++; changeQty(qty)"> + </button>
            </div>
            <span class="price">
              <del class="small"
              v-if="product.origin_price !== product.price">
              ${{ product.origin_price }}</del> ${{product.price}}
            </span>
          </div>
          <button type="button" class="btn btn-primary add-to-cart"
            @click.prevent="addToCart(product, qty)"
            :disabled="product.id === status.addCartLoading">
            <i
            class="spinner-border text-white"
            v-if="product.id === status.addCartLoading"
            style="width: 1.2em; height: 1.2em" role="status"></i>
            <span class="text-white">Add to Cart</span>
          </button>
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
      product: {},
      cart: {},
      status: {
        addCartLoading: '',
      },
      qty: 1,
    };
  },
  methods: {
    getData() {
      const { id } = this.$route.params;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`;
      axios.get(url)
        .then((response) => {
          console.log(response.data.product);
          this.product = response.data.product;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart(product, qty = 1) {
      const order = {
        product_id: product.id,
        qty,
      };
      this.status.addCartLoading = order.product_id;
      axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data: order })
        .then(() => {
          this.status.addCartLoading = '';
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
    changeQty(num) {
      this.qty = num;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>

nav {
  margin-top: 2em;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
  h4,
  p {
    margin-top: 1em;
  }
  .img-container {
    width: 100%;
    height: 800px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.product-content {
  .quantity-block {
    margin-block: 4em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .input-group {
      width: 8em;
    }
    .price {
      font-size: 1.5rem;
    }
  }
}

.add-to-cart {
  width: 100%;
  span {
    margin-left: 1em;
  }
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
  .img-container {
  height: 50%;
}

}

@media (max-width: 768px) {
  .img-container {
    grid-row: 2;
    height: 500px;
  }
}

@media (max-width: 576px) {
  .img-container {
    height: 400px;
  }
}
</style>
