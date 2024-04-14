<template>
  <div class="hero-img"></div>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">{{ $t('header.home') }}</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/products">{{ $t('header.products') }}</RouterLink>
        </li>
      </ol>
    </nav>

    <div class="products-grid">
      <!-- sidebar -->
      <div class="category">
        <div
          class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
          id="accordionExample"
        >
          <div class="card border-0">
            <div
              class="card-header px-0 py-4 bg-white
              border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingOne"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
            >
              <div
                class="d-flex justify-content-between align-items-center pe-1"
              >
                <h4 class="mb-0">{{ $t('product.category') }}</h4>
              </div>
            </div>
            <div>
              <div>
                <ul class="category-list list-unstyled">
                  <li>
                    <RouterLink to="/products" class="py-2 d-block"
                    :class="{ current: $route.query.category === undefined }"
                      >
                      <span v-if="$i18n.locale === 'zh-TW'">全部</span>
                      <span v-if="$i18n.locale === 'en'">All</span>
                    </RouterLink
                    >
                  </li>
                  <li v-for="category in categories" :key="category">
                    <RouterLink
                      :to="`/products?category=${category.zh}`"
                      :class="{ current: $route.query.category === category.zh }"
                      class="py-2 d-block"
                      >
                      <span v-if="$i18n.locale === 'zh-TW'">{{ category.zh }}</span>
                      <span v-if="$i18n.locale === 'en'">{{ category.en }}</span>
                      </RouterLink
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- loading -->
        <div class="loading" v-show="status.productsLoading">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <!-- product list -->
        <div class="product-list">
          <div v-for="item in products" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <div class="product-card border-cus-cream">
              <div class="img-container">
                <img :src="item.imageUrl" alt="product-img" />
              </div>
              <div class="product-content-flex">
                <div class="product-content">
                  <h3>
                    {{ item.title }}
                  </h3>
                  <span>${{ item.price }}</span>
                </div>
                <div class="cart-icon-container">
                  <i class="bi bi-cart-plus-fill text-primary cart-icon"
                    style="font-size: 20px"
                    @click.prevent="addToCart(item)"></i>
                </div>
              </div>
            </div>
          </RouterLink>
          </div>
        </div>
        <!-- pagination -->
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: !pages.has_pre }">
              <a
                class="page-link"
                href="#"
                @click.prevent="getData(pages.current_page - 1)"
              >
                {{ $t('page.previous') }}</a
              >
            </li>
            <li
              class="page-item"
              :class="{
                active: page === pages.current_page,
              }"
              v-for="page in pages.total_pages"
              :key="page + 123"
            >
              <a class="page-link" href="#" @click.prevent="getData(page)">
              {{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: !pages.has_next }">
              <a
                class="page-link"
                href="#"
                @click.prevent="getData(pages.current_page + 1)"
              >
              {{ $t('page.next') }}</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import { mapActions } from 'pinia';
import cartStore from '../../stores/cartStore';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      pages: {},
      categories: [
        { zh: '蛋糕', en: 'Cake' },
        { zh: '起司蛋糕', en: 'Cheesecake' },
        { zh: '派 / 塔', en: 'Pie / Tart' },
        { zh: '麵包', en: 'Bread' },
        { zh: '其他', en: 'Others' },
      ],
      status: {
        productsLoading: false,
        // addCartLoading: false,
      },
    };
  },
  watch: {
    '$route.query': {
      handler() {
        this.getData();
      },
      deep: true,
    },
    '$i18n.locale': {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
  methods: {
    getData(page = 1) {
      const { category = '' } = this.$route.query;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products?category=${category}&page=${page}`;
      this.status.productsLoading = true;
      axios.get(url)
        .then((response) => {
          this.status.productsLoading = false;
          this.pages = response.data.pagination;
          this.products = [];
          console.log(response.data.products);
          if (this.$i18n.locale === 'zh-TW') {
            this.products = response.data.products;
          } else if (this.$i18n.locale === 'en') {
            response.data.products.forEach((product) => {
              this.products.push(
                {
                  ...product.en,
                  id: product.id,
                  imageUrl: product.imageUrl,
                  price: product.price,
                  origin_price: product.origin_price,
                },
              );
            });
          }
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
    // addToCart(product, qty = 1) {
    //   const order = {
    //     product_id: product.id,
    //     qty,
    //   };
    //   this.status.addCartLoading = order.product_id;
    //   axios.post(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`, { data: order })
    //     .then(() => {
    //       this.status.addCartLoading = '';
    //       Swal.fire({
    //         title: '已加入購物車!',
    //         icon: 'success',
    //         confirmButtonColor: 'var(--bs-primary)',
    //         iconColor: 'var(--bs-primary)',
    //       });
    //     })
    //     .catch((error) => {
    //       Swal.fire({
    //         title: error.response.data.message,
    //         confirmButtonColor: 'var(--bs-danger)',
    //       });
    //       this.status.addCartLoading = '';
    //     });
    // },
    ...mapActions(cartStore, ['addToCart']),
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>

a {
  text-decoration: none;
}

.hero-img {
  height: 300px;
  background-image: url('https://images.unsplash.com/photo-1702742322469-36315505728f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  opacity: 0.9;
}

.breadcrumb {
  margin-block: 1.5em;
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

.category-list li {
    a {
      padding-inline: 0.5em;
      color: var(--bs-primary);
      &:hover {
        background-color: var(--bs-cus-cream);
        border-radius: 5px;
      }
    }
    .current {
        background-color: var(--bs-primary);
        border-radius: 5px;
        span {
          color: var(--bs-cus-cream);
        }
    }
}

.products-grid {
  display: grid;
  grid-template-columns: 2fr 10fr;
  gap: 3em;
}

.product-list {
  margin-bottom: 3em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5em;
}

.product-card {
  height: 390px;
  padding: 0.5em;
  border: solid 1px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    margin-top: 1em;
    font-size: 1.2rem;
  }
  .img-container {
    width: 100%;
    height: 75%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    transition: all 0.5s;
    &:hover{
      transform: scale(1.02);
    }
  }
  .product-content-flex{
    display: flex;
    justify-content: space-between;
    align-items: last baseline;
    .product-content {
    margin: 0.5em;
    }
  }
  .cart-icon-container {
      transition: all 0.2s ease;
      &:hover{
        transform: scale(1.1);
      }
    }
}

.pagination {
  display: flex;
  justify-content: center;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: 1fr;
    .category-list {
      display: flex;
      justify-content: space-around;
    }
  }
}

@media (max-width: 768px) {
  .products-grid {
    .product-list {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 576px){
  .products-grid {
    .product-card{
      height: 275px;
    }
  }
}
</style>
