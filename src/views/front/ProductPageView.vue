<template>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Library</a></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
    <div class="product-grid">
      <div class="product-img">
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
            <div class="input-group">
              <button class="btn btn-outline-secondary" type="button"> - </button>
              <input type="text" class="form-control"
                aria-label="Text input with 2 dropdown buttons">
              <button class="btn btn-outline-secondary" type="button"> + </button>
            </div>
            <span class="price">
              <del class="small"
              v-if="product.origin_price !== product.price">
              ${{ product.origin_price }}</del> ${{product.price}}
            </span>
          </div>
          <button type="button" class="btn btn-primary add-to-cart"
            @click.prevent="addToCart"
            :disabled="product.id === status.addCartLoading">
            <i v-if="product.id === status.addCartLoading" class="fas fa-spinner fa-pulse"></i>
            Add to Cart
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
      status: {
        addCartLoading: '',
      },
    };
  },
  methods: {
    getData() {
      const { id } = this.$route.params;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`;
      axios.get(url)
        .then((response) => {
          this.product = response.data.product;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    addToCart() {
      const order = {
        product_id: this.product.id,
        qty: 1,
      };
      this.status.addCartLoading = order.product_id;
      axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data: order })
        .then((response) => {
          console.log(response);
          this.status.addCartLoading = '';
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
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
  .product-img img{
    width: 100%;
  }
}

.product-content {
  /* display: flex;
  flex-direction: column;
  justify-content: space-between; */
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
}

</style>
