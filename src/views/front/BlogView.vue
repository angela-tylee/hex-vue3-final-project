<template>
  <div class="container">
    <!-- breadcrumb -->
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><RouterLink to="/">{{ $t('header.home') }}</RouterLink></li>
      <li class="breadcrumb-item"><RouterLink to="/blogs">{{ $t('header.blogs') }}</RouterLink></li>
      <li class="breadcrumb-item active text-primary" aria-current="page"
        v-if="!status.blogLoading">
        {{ blog.title }}
      </li>
    </ol>
    </nav>

  <!-- loading -->
    <div class="loading" v-if="status.blogLoading">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

  <!-- blog content -->
    <div class="blog-container">
      <div class="blog-title">
        <h1>{{ blog.title }}</h1>
        <p>{{ blog.description }}</p>
      </div>
      <div class="blog-img"><img :src="blog.image" alt="blog-img"></div>
      <div class="blog-content" v-html="blog.content"></div>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

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
  watch: {
    '$i18n.locale': {
      handler() {
        this.getArticle();
      },
      deep: true,
    },
  },
  methods: {
    getArticle() {
      const { id } = this.$route.params;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/article/${id}`;
      this.status.blogLoading = true;
      axios.get(url)
        .then((response) => {
          this.status.blogLoading = false;
          this.blog = response.data.article;
          if (this.$i18n.locale === 'zh-TW') {
            this.blog = response.data.article;
          } else if (this.$i18n.locale === 'en') {
            const data = response.data.article;
            this.blog = {
              ...data.en,
              id: data.id,
              image: data.image,
            };
          }
        })
        .catch((error) => {
          this.status.blogLoading = false;
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
  },
  mounted() {
    this.getArticle();
  },
};
</script>

<style scoped>

a {
  text-decoration: none;
}

h1 {
  margin-top: 1em;
}

.breadcrumb {
  margin-top: 3em;
}

.blog-content {
  margin-top: 3em;
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  .spinner-border {
    margin: 3em;
    width: 5em;
    height: 5em;
    --bs-spinner-border-width: 10px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 930px;
  }
}

</style>
