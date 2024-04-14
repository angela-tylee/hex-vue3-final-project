<template>
    <div class="row py-3">
    <div>
      <h2>折扣碼列表</h2>
      <div class="btn-group mt-3">
        <button type="button" class="btn btn-primary btn-sm"
        @click="openModal('new')">
        新增折扣碼
        </button>
      </div>
      <table class="table table-hover mt-4">
        <thead>
          <tr>
            <th width="150px">標題</th>
            <th width="120px">折扣碼</th>
            <th width="50px">折扣</th>
            <th width="80px">是否啟用</th>
            <th width="120px">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <td>{{ coupon.title }}</td>
            <td>{{ coupon.code }}</td>
            <td>{{ coupon.percent }}%</td>
            <td>
              <span class="text-success" v-if="coupon.is_enabled === 1">已啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', coupon)">
                編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', coupon)">
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
      <p>目前有 <span>{{ coupons.length }}</span> 個折扣碼</p>
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
              <span class="text-white">編輯折扣碼</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-8">
                <div class="mb-3 col-md-6">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control" placeholder="請輸入折扣碼標題"
                  v-model="temp.title">
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="author" class="form-label">折扣碼</label>
                    <input id="author" type="text" class="form-control" placeholder="請輸入折扣碼"
                    v-model="temp.code">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="author" class="form-label">折扣比例</label>
                    <input id="author" type="text" class="form-control"
                    placeholder="請輸入折扣比例（例：打7折，輸入70)"
                    v-model="temp.percent">
                  </div>
                  <p>原價：1000 折扣後金額：{{1000 * (temp.percent/100)}}</p>
                </div>

                <hr>
                <div class="mb-3">
                  <div class="form-check">
                    <input id="isPublic" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0"
                      v-model="temp.is_enabled">
                    <label class="form-check-label" for="isPublic">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateCoupon">
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
              <span class="text-white">刪除折扣碼</span>
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
            <button type="button" class="btn btn-danger" @click="delCoupon">
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

let couponModal = '';
let delCouponModal = '';

export default {
  data() {
    return {
      coupons: [],
      temp: {},
      isNew: false,
      status: {
        listLoading: false,
      },
    };
  },
  methods: {
    getData() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupons`;
      this.status.listLoading = true;
      axios.get(url)
        .then((response) => {
          this.coupons = response.data.coupons;
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
    updateCoupon() {
      let url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon`;
      let http = 'post';

      if (!this.isNew) {
        url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon/${this.temp.id}`;
        http = 'put';
      }

      axios[http](url, { data: this.temp })
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          couponModal.hide();
          this.getData();
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
        this.temp = {
          imagesUrl: [],
        };
        this.isNew = true;
        couponModal.show();
      } else if (isNew === 'edit') {
        this.temp = { ...item };
        this.isNew = false;
        couponModal.show();
      } else if (isNew === 'delete') {
        this.temp = { ...item };
        delCouponModal.show();
      }
    },
    delCoupon() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/coupon/${this.temp.id}`;

      axios.delete(url)
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          delCouponModal.hide();
          this.getData();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
  },
  mounted() {
    this.getData();

    couponModal = new bootstrap.Modal(document.getElementById('productModal'));
    delCouponModal = new bootstrap.Modal(document.getElementById('delProductModal'));
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
