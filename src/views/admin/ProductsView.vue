<template>
  <div class="row py-3">
    <div class="col-md-9">
      <h2>產品列表</h2>
      <table class="table table-hover mt-4">
        <thead>
          <tr>
            <th width="150">產品名稱</th>
            <th width="150">種類</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="150">是否啟用</th>
            <th width="120">編輯</th>
            <th width="120">查看細節</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td width="150">
              <RouterLink to="/admin/product-page">{{ item.title }}</RouterLink>
            </td>
            <td width="150">{{ item.category }}</td>
            <td width="120">{{ item.origin_price }}</td>
            <td width="120">{{ item.price }}</td>
            <td width="150">
              <span class="text-success" v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openModal('edit',item)">
                <!-- 點擊此按鈕，呼叫 Bootstrap JS 函式 openModal()，isNew = edit 的條件 -->
                編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete',item)">
                <!-- 點擊此按鈕，呼叫 Bootstrap JS 函式 openModal()，isNew = delete 的條件 -->
                刪除
                </button>
              </div>
            </td>
            <td width="120">
              <button type="button" class="btn btn-primary" v-on:click="temp = item">
                查看細節
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>目前有 <span>{{ products.length }}</span> 項產品</p>
    </div>
    <div class="col-md-3">
      <h2>單一產品細節</h2>
      <template v-if="temp.title">
        <div class="card mb-3">
          <img v-bind:src="temp.imageUrl" class="card-img-top primary-image" alt="主圖" />
          <div class="card-body">
            <h5 class="card-title">
              {{ temp.title }}
              <span class="badge bg-primary ms-2">{{ temp.category }}</span>
            </h5>
            <p class="card-text">商品描述：{{ temp.description}}</p>
            <p class="card-text">商品內容：{{ temp.content }}</p>
            <div class="d-flex">
              <p class="card-text me-2">{{ temp.price}}</p>
              <p class="card-text text-secondary">
                <del>{{ temp.origin_price }}</del>
              </p>
              元 / {{ temp.unit }}
            </div>
          </div>
        </div>
        <template>
          <img src="" alt="" class="images m-2" />
        </template>
      </template>
      <p class="text-secondary" v-else>請選擇一個商品查看</p>
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
    };
  },
  methods: {
    checkAdmin() {
      const url = `${VITE_API_URL}/api/user/check`;
      axios.post(url)
        .then(() => {
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = 'log-in.html';
        });
    },
    getData() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/products/all`;
      axios.get(url)
        // 成功後顯示將 response.data.products 存到定義好的 products 陣列中，使 products.html 取值
        .then((response) => {
          console.log(response.data.products);
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
  mounted() {
    // 取出 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
};
</script>

<style></style>
