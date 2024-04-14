<template>
  <div class="row py-3">
    <div>
      <h2>文章列表</h2>
      <div class="btn-group mt-3">
        <button type="button" class="btn btn-primary btn-sm"
        @click="openModal('new')">
        新增文章
        </button>
      </div>
      <table class="table table-hover mt-4">
        <thead>
          <tr>
            <th width="120px">標題</th>
            <th width="150px">ID</th>
            <th width="120px">是否發佈</th>
            <th width="120px">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="blog in blogs" :key="blog.id">
            <td>{{ blog.title }}</td>
            <td>{{ blog.id }}</td>
            <td>
              <span class="text-success" v-if="blog.isPublic">已發佈</span>
              <span v-else>未發佈</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', blog)">
                編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', blog)">
                刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- loading -->
      <div class="loading" v-if="status.listLoading">
        <div class="spinner-border text-primary" role="status"></div>
      </div>
      <p>目前有 <span>{{ blogs.length }}</span> 篇文章</p>
    </div>
  </div>

    <!-- Modal -->
    <!-- editProductModal -->
    <div id="productModal" ref="productModal" class="modal fade"
  tabindex="-1" aria-labelledby="productModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span class="text-white">編輯文章</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="author" class="form-label">作者</label>
                  <input id="author" type="text" class="form-control" placeholder="請輸入作者"
                  v-model="temp.author">
                </div>
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結"
                    v-model="temp.image">
                  </div>
                  <img class="img-fluid" :src="temp.image" alt="image-preview">
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                  v-model="temp.title">
                </div>
                <div class="row">
                  <div class="mb-3 col-md-12">
                    <label for="description" class="form-label">簡介</label>
                    <textarea id="description" type="text"
                    class="form-control" placeholder="請輸入簡介"
                    v-model="temp.description">
                    </textarea>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">內容</label>
                  <textarea id="content" type="text" class="form-control" placeholder="請輸入文章內容"
                    v-model="temp.content">
                    </textarea>
                </div>
                <hr>
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                  v-model="enTemp.title">
                </div>
                <div class="mb-3 col-md-12">
                    <label for="description" class="form-label">Description</label>
                    <textarea id="description" type="text"
                    class="form-control" placeholder="請輸入簡介"
                    v-model="enTemp.description">
                    </textarea>
                  </div>
                <div class="mb-3">
                  <label for="content" class="form-label">Content</label>
                  <textarea id="content" type="text" class="form-control" placeholder="請輸入文章內容"
                    v-model="enTemp.content">
                    </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="isPublic" class="form-check-input" type="checkbox"
                    :true-value="true" :false-value="false"
                      v-model="temp.isPublic">
                    <label class="form-check-label" for="isPublic">是否發布</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateArticle">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- delProductModal -->
    <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span class="text-white">刪除文章</span>
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
            <button type="button" class="btn btn-danger" @click="delArticle">
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

let articleModal = '';
let delArticleModal = '';

export default {
  data() {
    return {
      blogs: [],
      temp: {},
      enTemp: {},
      isNew: false,
      status: {
        listLoading: false,
      },
    };
  },
  methods: {
    getArticles() {
      this.status.listLoading = true;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/articles`;
      axios.get(url)
        .then((response) => {
          console.log(response.data.articles);
          this.blogs = response.data.articles;
          this.status.listLoading = false;
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
          this.status.listLoading = false;
          console.log(error.response.status);
          if (error.response.status === 401) {
            this.$router.push('/log-in');
          }
        });
    },
    getArticle(id) {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${id}`;
      axios.get(url)
        .then((response) => {
          console.log(response);
          this.temp = response.data.article;
          this.enTemp = response.data.article.en;
          articleModal.show();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
    openModal(isNew, item) {
      if (isNew === 'new') {
        this.isNew = true;
        this.temp = {
          create_at: Date.now(),
        };
        articleModal.show();
      } else if (isNew === 'edit') {
        this.isNew = false;
        this.getArticle(item.id);
      } else if (isNew === 'delete') {
        this.temp = { ...item };
        delArticleModal.show();
      }
    },
    updateArticle() {
      let url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article`;
      let http = 'post';

      if (!this.isNew) {
        url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${this.temp.id}`;
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
          console.log(response);
          articleModal.hide();
          this.getArticles();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
    delArticle() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/article/${this.temp.id}`;

      axios.delete(url)
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          delArticleModal.hide();
          this.getArticles();
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
    this.getArticles();

    articleModal = new bootstrap.Modal(document.getElementById('productModal'));
    delArticleModal = new bootstrap.Modal(document.getElementById('delProductModal'));
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
