<template>
  <h2>單一產品頁面</h2>
    <div class="card mb-3">
      <img v-bind:src="item.imageUrl" class="card-img-top primary-image" alt="主圖" />
      <div class="card-body">
        <h5 class="card-title">
          {{ products.title }}
          <span class="badge bg-primary ms-2">{{ item.category }}</span>
        </h5>
        <p class="card-text">商品描述：{{ item.description }}</p>
        <p class="card-text">商品內容：{{ item.content }}</p>
        <div class="d-flex">
          <p class="card-text me-2">{{ item.price }}</p>
          <p class="card-text text-secondary">
            <del>{{ item.origin_price }}</del>
          </p>
          元 / {{ item.unit }}
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      temp: {},
    };
  },
  methods: {
    getData() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/products`;
      axios.get(url)
        // 成功後顯示將 response.data.products 存到定義好的 products 陣列中，使 products.html 取值
        .then((response) => {
          this.products = response.data.products;
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
};
</script>
