<template>
  <div class="container">
      <div class="login-card">
        <h1>
          請先登入
        </h1>
        <div class="login-form">
          <form id="form" class="form-signin" v-on:submit.prevent="login">
            <!-- v-on 監聽事件，此處的 Event = "submit";
              Event Handler = "login"。"login" 定義在 "log-in.js" 的 methods  -->
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username" placeholder="name@example.com"
                v-model="user.username" required autofocus>
              <!-- v-model 雙向綁定使用者輸入在此 <input> 的值，會同時輸入至 ”log-in.js" 定義的 data -->
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password" placeholder="Password"
              v-model="user.password" required>
              <!-- v-model 雙向綁定使用者輸入在此 <input> 的值，會同時輸入至 ”log-in.js" 定義的 data -->
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

const { VITE_API_URL } = import.meta.env;

export default {
  data() {
    return {
      // 使用者輸入的帳號(username)密碼(password)
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
          // 登入成功後導向 products-wk3.html
          // window.location = 'products-wk3.html';
          this.$router.push('/admin/products');
        })
        .catch((error) => {
          alert(error.data.message);
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
