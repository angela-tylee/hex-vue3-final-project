<template>
  <div class="container">
      <div class="login-card">
        <h1>
          請先登入
        </h1>
        <div class="login-form">
          <form id="form" class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username" placeholder="name@example.com"
                v-model="user.username" required autofocus>
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password" placeholder="Password"
              v-model="user.password" required>
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_API_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      const api = `${VITE_API_URL}/admin/signin`;
      axios.post(api, this.user)
        .then((response) => {
          const { token, expired } = response.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
          this.$router.push('/admin/products');
        })
        .catch((error) => {
          Swal.fire({
            title: error.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
  },
};
</script>

<style scoped>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 20em;
  display: flex;
  flex-direction: column;
  align-items: center;
  .login-form {
    width: 100%;
    margin-top: 3em;
  }
}

</style>
