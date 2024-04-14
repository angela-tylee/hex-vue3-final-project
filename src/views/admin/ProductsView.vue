<template>
  <div class="row py-3">
    <div class="col-md-9">
      <h2>產品列表</h2>
      <div class="btn-group mt-3">
        <button type="button" class="btn btn-primary btn-sm"
        @click="openModal('new')">
        新增產品
        </button>
      </div>
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
            <td width="150">{{ item.title }}</td>
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
                @click="openModal('edit',item, item.en)">
                編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete',item)">
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
      <!-- loading -->
      <div class="loading" v-if="status.listLoading">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <p>目前有 <span>{{ Object.keys(products).length }}</span> 項產品</p>
    </div>

    <div class="col-md-3">
      <h2>單一產品細節</h2>
      <template v-if="temp.title">
        <div class="card mb-3">
          <img v-bind:src="temp.imageUrl" class="card-img-top primary-image" alt="main-image" />
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
          <img src="" alt="image" class="images m-2" />
        </template>
      </template>
      <p class="text-secondary" v-else>請選擇一個商品查看</p>
    </div>
  </div>

  <!-- Modal -->
  <div id="productModal" ref="productModal" class="modal fade"
  tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span class="text-white" v-if="isNew">新增產品</span>
              <span class="text-white" v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結"
                    v-model="temp.imageUrl">
                  </div>
                  <img class="img-fluid" :src="temp.imageUrl" alt="image-preview">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="title" class="form-label">標題</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                    v-model="temp.title">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="title" class="form-label">Title</label>
                    <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                    v-model="enTemp.title">
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                    v-model="temp.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">Category</label>
                    <input id="category" type="text" class="form-control" placeholder="請輸入單位"
                    v-model="enTemp.category">
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="unit" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入分類"
                    v-model="temp.unit">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">Unit</label>
                    <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                    v-model="enTemp.unit">
                  </div>
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input id="origin_price" type="number"
                    min="0" class="form-control" placeholder="請輸入原價"
                    v-model="temp.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                      v-model="temp.price">
                  </div>
                </div>
                <hr>
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                    v-model="temp.description">
                    </textarea>
                </div>
                <div class="mb-3">
                  <label for="description" class="form-label">Product Description</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                    v-model="enTemp.description">
                    </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                  v-model="temp.content">
                    </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0"
                      v-model="temp.is_enabled">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span class="text-white">刪除產品</span>
            </h5>
            <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ temp.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct">
              確認刪除
            </button>
          </div>
        </div>
      </div>-
    </div>
    <!-- Modal -->

  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

let productModal = '';
let delProductModal = '';

export default {
  data() {
    return {
      products: [],
      temp: {},
      enTemp: {},
      isNew: false,
      status: {
        listLoading: false,
      },
    };
  },
  methods: {
    getData() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/products/all`;
      this.status.listLoading = true;
      axios.get(url)
        .then((response) => {
          this.products = response.data.products;
          this.status.listLoading = false;
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
          this.status.listLoading = false;
          if (error.response.status === 401) {
            this.$router.push('/log-in');
          }
        });
    },
    openProduct(item) {
      this.temp = item;
    },
    updateProduct() {
      let url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/product`;
      let http = 'post';

      if (!this.isNew) {
        url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/product/${this.temp.id}`;
        http = 'put';
      }

      axios[http](url, { data: { ...this.temp, en: this.enTemp } })
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          productModal.hide();
          this.getData();
        })
        .catch((error) => {
          Swal.fire({
            title: error.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
    openModal(isNew, item, enItem) {
      if (isNew === 'new') {
        this.temp = {
          en: this.enTemp,
        };
        this.isNew = true;
        productModal.show();
      } else if (isNew === 'edit') {
        this.temp = { ...item };
        this.enTemp = { ...enItem };
        this.isNew = false;
        productModal.show();
      } else if (isNew === 'delete') {
        this.temp = { ...item };
        delProductModal.show();
      }
    },
    delProduct() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/product/${this.temp.id}`;

      axios.delete(url)
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          delProductModal.hide();
          this.getData();
        })
        .catch((error) => {
          Swal.fire({
            title: error.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
  },
  mounted() {
    this.getData();

    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'));
  },
};
</script>

<style>
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
</style>
