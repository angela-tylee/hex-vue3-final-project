<template>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
      <li class="breadcrumb-item"><RouterLink to="/blogs">Blog</RouterLink></li>
      <li class="breadcrumb-item active text-primary" aria-current="page">{{ blog.title }}</li>
    </ol>
    </nav>

  <!-- loading -->
    <div class="loading" v-if="status.blogLoading">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

  <!-- blog content -->
    <div class="blog-title">
      <h1>{{ blog.title }}</h1>
      <p>{{ blog.description }}</p>
    </div>
    <div class="blog-img"><img :src="blog.image" alt=""></div>
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
      status: {
        blogLoading: false,
      },
    };
  },
  methods: {
    getArticle() {
      const { id } = this.$route.params;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/article/${id}`;
      this.status.blogLoading = true;
      axios.get(url)
        .then((response) => {
          this.status.blogLoading = false;
          console.log(response);
          this.blog = response.data.article;
        })
        .catch((err) => {
          this.status.blogLoading = false;
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
}

.blog-content :deep(p) {
  text-indent: 2rem;
}

.blog-content :deep(h4) {
  margin-top: 2em;
}

.blog-img {
  img {
    width: 100%;
  }
}

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
