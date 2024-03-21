<template>
  <div class="hero-img"></div>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Library</a></li>
        <li class="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>

    <!-- dropdown -->
    <div class="dropdown">
      <label for="category"></label>
      <select name="" id="category" class="form-select border-primary">
        <option selected>Category</option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
        <option value=""></option>
      </select>
    </div>

    <!-- product list -->
    <div class="product-list">
      <div class="product-card border-cus-cream"
        v-for="item in products" :key="item.id">
        <img :src="item.imageUrl" alt="product-img">
        <RouterLink :to="`/product/${item.id}`">
          <h3>{{ item.title }}</h3>
        </RouterLink>
        <span>${{ item.price }}</span>
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
          <a class="page-link" href="#" @click.prevent="getData(pages.current_page + 1)">Next</a>
        </li>
      </ul>
    </nav>
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
    };
  },
  methods: {
    getData(page = 1) {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products?page=${page}`;
      axios.get(url)
        // 成功後顯示將 response.data.products 存到定義好的 products 陣列中，使 products.html 取值
        .then((response) => {
          this.products = response.data.products;
          this.pages = response.data.pagination;
        })
        .catch((err) => {
        // 失敗顯示預設的錯誤訊息
          alert(err.response.data.message);
        });
    },
    openProduct(item) {
      this.temp = item;
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

.form-select {
  display: inline;
  width: 8em;
}

.product-list {
  margin-block: 3em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5em;
}

.product-card {
  padding: 0.5em;
  border: solid 1px;
  border-radius: 6px;
  h3 {
    margin-top: 1em;
    font-size: 1.2rem;
  }
  img {
    width: 100%;
  }
  a {
    text-decoration: none;
  }
}

.pagination {
  display: flex;
  justify-content: center;
}

</style>