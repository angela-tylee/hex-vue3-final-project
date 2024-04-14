<template>
  <div class="container">
    <h1 class="border-primary">{{ $t('header.blogs') }}</h1>

    <!-- loading -->
    <div class="loading" v-if="status.blogsLoading">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <!-- blog list -->
    <div class="blog-list">
      <div
        class="blog-card border-cus-cream"
        v-for="blog in blogs"
        :key="blog.id"
      >
        <div class="blog-card-content">
          <RouterLink :to="`/blog/${blog.id}`">
            <h3 v-if="$i18n.locale === 'zh-TW'">{{ blog.title }}</h3>
            <h3 v-if="$i18n.locale === 'en'">{{ blog.en.title }}</h3>
          </RouterLink>
          <p v-if="$i18n.locale === 'zh-TW'">{{ blog.description }}</p>
          <p v-if="$i18n.locale === 'en'">{{ blog.en.description }}</p>
        </div>
        <div class="blog-card-img">
          <img :src="blog.image" alt="blog-img" />
        </div>
      </div>
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
      blogs: [],
      status: {
        blogsLoading: false,
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
      this.status.blogsLoading = true;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/articles`;
      axios
        .get(url)
        .then((response) => {
          this.status.blogsLoading = false;
          this.blogs = response.data.articles;
        })
        .catch((error) => {
          this.status.blogsLoading = false;
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
  border: solid 1px;
  border-radius: 6px;
  height: 200px;
  display: grid;
  grid-template-columns: 8fr 4fr;
  .blog-card-content {
    padding: 0.5em 1em;
    overflow: hidden;
    h3 {
      margin-top: 1em;
      font-size: 1.2rem;
    }
    a {
      text-decoration: none;
    }
  }

  .blog-card-img {
    overflow: hidden;
    img {
      width: 120%;
      object-fit: cover;
    }
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

@media (max-width: 768px) {
  .blog-card {
    height: 400px;
    grid-template-columns: 1fr;

    .blog-card-img {
      grid-row: 1;
      img {
        position: relative;
        top: -20px;
      }
    }
  }
}
</style>
