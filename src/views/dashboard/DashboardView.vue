<template>
  <h2>這是後台</h2>
  <nav>
    <RouterLink to="/admin/products">產品列表</RouterLink> |
    <RouterLink to="/admin/order">訂單</RouterLink> |
    <RouterLink to="/">前台</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';

const { VITE_API_URL } = import.meta.env;

export default {
  methods: {
    checkAdmin() {
      const url = `${VITE_API_URL}/api/user/check`;
      axios.post(url)
        .then(() => {
          // this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
          // window.location = 'log-in.html';
          this.$router.push('/log-in');
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
