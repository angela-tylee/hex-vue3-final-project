<template>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <RouterLink to="/">{{ $t('header.home') }}</RouterLink>
        </li>
        <li class="breadcrumb-item">
          <RouterLink to="/products">{{ $t('header.products') }}</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
      </ol>
    </nav>

    <!-- loading -->
    <div class="loading" v-show="status.pageLoading">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- products -->
    <div class="product-grid">
      <div class="product-img">
        <img :src="product.imageUrl" alt="product-img">
      </div>
      <div class="product-content">
        <div>
          <h2>{{ product.title }}</h2>
          <span>{{ product.category }}</span>
          <h5 class="text-primary mt-3">PRODUCT DESCRIPTION</h5>
          <p>{{ product.description }}</p>
        </div>
        <div>
          <div class="quantity-block">
            <div class="input-group">
              <button class="btn btn-outline-secondary" type="button"
              @click="qty--; changeQty(qty)" :disabled="qty === 1"> - </button>
                <input type="text" class="form-control text-center"
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
            <span class="text-white">{{ $t('button.add-to-cart') }}</span>
          </button>
        </div>
      </div>
    </div>
    <div class="similar-product-block">
      <h2 class="text-left mb-5 similar-product-title">
        Similar Desserts
      </h2>
      <div class="product-cards">
        <div v-for="product in filteredCake" :key="product.id">
          <RouterLink :to="`/product/${product.id}`">
            <div class="img-container">
              <img :src="product.imageUrl" alt="blog-img" />
            </div>
            <p v-if="$i18n.locale === 'zh-TW'" class="mt-3 fs-20 text-center">
              {{ product.title }}
            </p>
            <p v-if="$i18n.locale === 'en'" class="mt-3 fs-20 text-center">
              {{ product.en.title }}
            </p>
          </RouterLink>
        </div>
      </div>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      similarProducts: [],
      cart: {},
      status: {
        pageLoading: false,
        addCartLoading: '',
      },
      qty: 1,
    };
  },
  watch: {
    '$i18n.locale': {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
  methods: {
    getProducts() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products/all`;
      axios
        .get(url)
        .then((response) => {
          this.similarProducts = response.data.products;
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
    getData() {
      const { id } = this.$route.params;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/product/${id}`;

      this.status.pageLoading = true;

      axios.get(url)
        .then((response) => {
          console.log(response.data.product);
          this.status.pageLoading = false;
          this.product = response.data.product;
          if (this.$i18n.locale === 'zh-TW') {
            this.product = response.data.product;
          } else if (this.$i18n.locale === 'en') {
            const data = response.data.product;
            this.product = {
              ...data.en,
              id: data.id,
              imageUrl: data.imageUrl,
              price: data.price,
              origin_price: data.origin_price,
            };
          }
        })
        .catch((error) => {
          this.status.pageLoading = false;
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
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
          Swal.fire({
            title: '已加入購物車!',
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
          this.status.addCartLoading = '';
        });
    },
    changeQty(num) {
      this.qty = num;
    },
  },
  computed: {
    filteredCake() {
      return this.similarProducts
        .filter(
          (item) => item.category === this.product.category
          || item.en.category === this.product.category,
        )
        .slice(0, 3);
    },
  },
  mounted() {
    this.getData();
    this.getProducts();
  },
};
</script>

<style scoped>

a {
  text-decoration: none;
}

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
  .product-img {
    width: 100%;
    height: 60vh;
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

.similar-product-block {
  margin-top: 8em;
}

.product-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2em;
  h5 {
    margin-top: 1.5em;
    text-align: center;
  }
  img {
    border-radius: 15px;
  }
}

.img-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  transition: all 0.5s;
    &:hover{
      transform: scale(1.02);
      cursor: pointer;
    }
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  .spinner-border {
    margin: 3em;
    width: 5em;
    height: 5em;
    --bs-spinner-border-width: 10px;
  }
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: 1fr;
    .product-img {
      width: 100%;
      height: 30vh;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .img-container {
    height: 50%;
  }
}
</style>
