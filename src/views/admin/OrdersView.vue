<template>
  <div class="row py-3 list-container">
    <div>
      <h2>訂單列表</h2>
      <table class="table table-hover mt-4">
        <thead>
          <tr>
            <th width="120px">訂單編號</th>
            <th width="100px">姓名</th>
            <th width="150px">品項</th>
            <th width="100px">金額</th>
            <th width="120px">Email / 電話</th>
            <th width="150px">地址</th>
            <th width="150px">付款狀態</th>
            <th width="100px">編輯</th>
            <!-- <th width="">留言</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.user.name }}</td>
            <td>
              <div class="text-black"
                v-for="product in order.products" :key="product.id">
                {{ product.product.title }} x {{ product.qty }}
              </div>
            </td>
            <td>$ {{ order.total }}</td>
            <td>{{ order.user.email }}<br>{{ order.user.tel }}</td>
            <td>{{ order.user.address }}</td>
            <td v-if="order.is_paid" class="text-success">已付款</td>
            <td v-else class="text-danger">未付款</td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete',order)">
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
      <p>目前有 <span>{{ orders.length }}</span> 項產品</p>
    </div>
  </div>

  <!-- delProductModal -->
  <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
              <span class="text-white">刪除訂單</span>
            </h5>
            <button type="button" class="btn-close"
            data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ temp.title }}</strong> 訂單(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="delOrder">
              確認刪除
            </button>
          </div>
        </div>
      </div>-
    </div>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
import * as bootstrap from 'bootstrap';
import Swal from 'sweetalert2';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

let delOrderModal = '';

export default {
  data() {
    return {
      orders: [],
      temp: {},
      isNew: false,
      status: {
        listLoading: false,
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  methods: {
    getOrders() {
      this.status.listLoading = true;
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders`)
        .then((response) => {
          console.log(response);
          this.orders = response.data.orders;
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
    openModal(isNew, item) {
      if (isNew === 'delete') {
        this.temp = { ...item };
        delOrderModal.show();
      }
    },
    delOrder() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/admin/order/${this.temp.id}`;

      axios.delete(url)
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            icon: 'success',
            confirmButtonColor: 'var(--bs-primary)',
            iconColor: 'var(--bs-primary)',
          });
          delOrderModal.hide();
          this.getOrders();
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
    this.getOrders();

    delOrderModal = new bootstrap.Modal(document.getElementById('delProductModal'));
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
