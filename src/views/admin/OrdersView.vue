<template>
  <div class="row py-3">
    <div>
      <h2>訂單列表</h2>
      <table class="table table-hover mt-4">
        <thead>
          <tr>
            <th width="120px">訂單編號</th>
            <th width="150px">品項</th>
            <th width="50px">數量</th>
            <th width="50px">金額</th>
            <th width="100px">姓名</th>
            <th width="120px">Email</th>
            <th width="120px">電話</th>
            <th width="150px">地址</th>
            <th width="100px">編輯</th>
            <!-- <th width="">留言</th> -->
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <!-- <td>{{ order.products.product.title }}</td> 要再取巢狀深層的值 -->
            <!-- <td>{{ order.products.qty }}</td> 要再取巢狀深層的值 -->
            <td>{{ order.total }}</td>
            <td>{{ order.user.name }}</td>
            <td>{{ order.user.email }}</td>
            <td>{{ order.user.tel }}</td>
            <td>{{ order.user.address }}</td>
            <td>
              <!-- <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openModal('edit',item)">
                編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModal('delete',item)">
                刪除
                </button>
              </div> -->
            </td>
            <!-- <td>
              <button type="button" class="btn btn-primary" v-on:click="temp = item">
                查看細節
              </button>
            </td> -->
          </tr>
        </tbody>
      </table>
      <p>目前有 <span></span> 項產品</p>
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
      orders: {},
      status: {
        addCartLoading: '',
        cartQtyLoading: '',
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
    getOrder() {
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/admin/orders`)
        .then((response) => {
          this.orders = response.data.orders;
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
  mounted() {
    this.getOrder();
    console.log(this.orders);
  },
};

</script>

<style></style>
