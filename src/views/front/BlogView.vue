<template>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">Home</a></li>
      <li class="breadcrumb-item"><a href="#">Library</a></li>
      <li class="breadcrumb-item active" aria-current="page">Data</li>
    </ol>
    </nav>
    <div class="blog-title">
      <h1>{{ blog.title }}</h1>
      <p>{{ blog.description }}</p>
    </div>
    <div class="blog-content" v-html="blog.content"></div>
  </div>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      blog: {},
    };
  },
  methods: {
    getArticle() {
      const { id } = this.$route.params;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/article/${id}`;
      axios.get(url)
        .then((response) => {
          console.log(response);
          this.blog = response.data.article;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getArticle();
  },
};
</script>

<style scoped>

h1 {
  margin-top: 1em;
}

.breadcrumb {
  margin-top: 3em;
}

.blog-content {
  margin-top: 3em;
  h3 {
    margin-top: 2em;
  }
}
</style>
