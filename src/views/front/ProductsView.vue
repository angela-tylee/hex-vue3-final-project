<template>
  <div class="hero-img"></div>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/products">Desserts</RouterLink></li>
        <li class="breadcrumb-item active text-primary" aria-current="page">
          {{ $route.query.category }}
        </li>
      </ol>
    </nav>

    <div class="products-grid">
      <!-- sidebar -->
      <div class="category">
        <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
        id="accordionExample">
          <div class="card border-0">
            <div class="card-header px-0 py-4 bg-white
            border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
              id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">
                  Category
                </h4>
              </div>
            </div>
            <div>
              <div>
                <ul class="category-list list-unstyled">
                  <li>
                    <RouterLink to="/products"
                    class="py-2 d-block text-muted">全部</RouterLink>
                  </li>
                  <li v-for="category in categories" :key="category">
                    <RouterLink :to="`/products?category=${category}`"
                    class="py-2 d-block text-muted">{{ category }}</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <!-- dropdown -->
        <!-- <div class="dropdown">
          <label for="category"></label>
          <select name="" id="category" class="form-select border-primary">
            <option selected>Category</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div> -->

        <!-- loading -->
        <div class="loading" v-show="status.productsLoading">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <!-- product list -->
        <div class="product-list">
          <div class="product-card border-cus-cream"
            v-for="item in products" :key="item.id">
            <div class="img-container">
              <img :src="item.imageUrl" alt="product-img">
            </div>
            <div class="product-content">
              <h3><RouterLink :to="`/product/${item.id}`">{{ item.title }}</RouterLink></h3>
              <span>${{ item.price }}</span>
            </div>
          </div>
        </div>
        <!-- pagination -->
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" :class="{ disabled: !pages.has_pre}">
              <a class="page-link" href="#" @click.prevent="getData(pages.current_page - 1)">
                Previous</a>
            </li>
            <li class="page-item" :class="{
                active: page === pages.current_page
              }" v-for="page in pages.total_pages" :key="page + 123">
              <a class="page-link" href="#" @click.prevent="getData(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{ disabled: !pages.has_next}">
              <a class="page-link" href="#" @click.prevent="getData(pages.current_page + 1)">
                Next</a>
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

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      temp: {},
      pages: {},
      categories: ['蛋糕', '起司蛋糕', '派 / 塔', '麵包', '其他'],
      status: {
        productsLoading: false,
      },
    };
  },
  watch: {
    '$route.query': {
      handler() {
        this.getData(); // $route.query 值有變化的時候，重新取值
      },
      deep: true, // 深層監聽
    },
  },
  methods: {
    getData(page = 1) {
      const { category = '' } = this.$route.query; // category 必須預設為空值，否則會是 undefined
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products?category=${category}&page=${page}`;
      this.status.productsLoading = true;
      axios.get(url)
        .then((response) => {
          this.status.productsLoading = false;
          this.products = response.data.products;
          this.pages = response.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getData();
    // 取出 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
  },
};
</script>

<style scoped>

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

.category {
  a {
    text-decoration: none;
  }
}

.form-select {
  display: inline;
  width: 8em;
}

.dropdown {
  margin-bottom: 2em;
}

.products-grid {
  display: grid;
  grid-template-columns: 3fr 7fr;
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
  }
  .product-content {
    margin: 0.5em;
  }
  a {
    text-decoration: none;
  }
}

.pagination {
  display: flex;
  justify-content: center;
}
/* breakpoints: 375px,  576px, 768px, 1024px, 1440px, 1920px*/
@media (max-width: 1024px){
  .products-grid {
    grid-template-columns: 1fr;
    .category-list {
      display: flex;
      justify-content: space-around;
    }
  }
}

@media (max-width: 768px){
  .products-grid {
    .product-list{
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media (max-width: 576px){
  .products-grid {
    .product-list{
      grid-template-columns: 1fr;
    }
  }
}

</style>
