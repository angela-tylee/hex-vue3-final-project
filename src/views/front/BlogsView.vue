<template>
  <div class="container">
    <h1 class="border-primary">Blog</h1>
    <div class="blog-list">
      <div class="blog-card border-cus-cream"
        v-for="blog in blogs" :key="blog.id">
        <div class="blog-card-content">
          <RouterLink :to="`/blog/${blog.id}`">
            <h3>{{ blog.title }}</h3>
          </RouterLink>
          <p>{{ blog.description }}</p>
        </div>
        <img :src="blog.image" alt="blog-img">
      </div>
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
      blogs: [],
    };
  },
  methods: {
    getArticle() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/articles`;
      axios.get(url)
        .then((response) => {
          console.log(response.data.articles);
          this.blogs = response.data.articles;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getArticle();

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
  },
};
</script>

<style scoped>

h1 {
  text-align: center;
  margin-top: 2em;
  padding-bottom: 0.5em;
  border-bottom: 2px solid;
}

.breadcrumb {
  margin-block: 1.5em;
}

.blog-list {
  margin-block: 3em;
}

.blog-card {
  margin-top: 2em;
  padding: 0.5em 2em;
  border: solid 1px;
  border-radius: 6px;
  h3 {
    margin-top: 1em;
    font-size: 1.2rem;
  }
  img {
    width: 100%;
  }
  a {
    text-decoration: none;
  }
}
</style>
