<template>
  <aside class="sidebar bg-cus-brown">
      <span class="logo-dashboard">
        <img src="../../../public/logo/logo-dashboard-cream.png" alt="logo">
      </span>
      <ul>
        <li><RouterLink to="/admin/products" class="text-cus-cream">產品列表</RouterLink></li>
        <li><RouterLink to="/admin/orders" class="text-cus-cream">訂單列表</RouterLink></li>
        <li><RouterLink to="/admin/blogs" class="text-cus-cream">文章列表</RouterLink></li>
        <li><RouterLink to="/admin/coupons" class="text-cus-cream">折扣碼列表</RouterLink></li>
        <li><RouterLink to="/" class="text-cus-cream">回到前台</RouterLink></li>
      </ul>
  </aside>
  <div class="content">
    <header class="bg-cus-brown"></header>
    <div class="container">
      <RouterView></RouterView>
    </div>
    <footer class="copyright">
      <span>copyright@angelalee</span><br>
      <span>僅供學習使用，非商業用途</span>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_API_URL } = import.meta.env;

export default {
  methods: {
    checkAdmin() {
      const url = `${VITE_API_URL}/api/user/check`;
      axios.post(url)
        .then(() => {
        })
        .catch((error) => {
          this.$router.push('/log-in');
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin();
  },
};
</script>

<style scoped>

.container {
  margin: 0;
  padding-block: 2em;
  padding-left: 5em;
}

.copyright {
  text-align: center;
  font-size: 0.8rem;
  margin: 0 auto;
}

.sidebar {
  width: 220px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow-x: hidden;
  padding: 2em 2em;
  .logo-dashboard {
    margin-left: 1em;
    img {
      width: 90px;
    }
  }
  ul {
    list-style: none;
    list-style-position: outside;
    display: flex;
    flex-direction: column;
    align-items:flex-start;
    padding: 0px;
    margin-top: 3em;
  };
  a {
    padding: 0.5em 1em;
    text-decoration: none;
    font-size: 1.2rem;
    display: block;
  }
  a:hover {
    background-color: #9d6424;
    width: 150px;
    border-radius: 20px;
  }
}

.content {
  margin-left: 220px;
  padding: 0px;
}

header {
  height: 120px;
}

</style>
