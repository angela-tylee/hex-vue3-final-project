<template>
  <div class="hero">
    <div class="hero-content container">
      <h1 class="text-cus-cream">
        {{ $t('home.slogan') }}
      </h1>
      <p class="text-cus-cream">{{ $t('home.subheading') }}</p>
    </div>
  </div>
  <div class="container">
    <div class="intro homepage-block">
      <div class="intro-block">
        <div class="intro-content">
          <h2>{{ $t('home.intro-1') }}</h2>
          <p>
            {{ $t('home.intro-content-1') }}
          </p>
        </div>
        <div class="intro-img-container">
          <img
            src="https://images.unsplash.com/photo-1549590143-d5855148a9d5?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="intro-img"
          />
        </div>
      </div>
      <div class="intro-block">
        <div class="intro-img-container">
          <img
            src="https://images.unsplash.com/photo-1588467850695-a898367ce465?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="intro-img"
          />
        </div>
        <div class="intro-content">
          <h2>{{ $t('home.intro-2') }}</h2>
          <p>
            {{ $t('home.intro-content-2') }}
          </p>
        </div>
      </div>
      <div class="intro-block">
        <div class="intro-content">
          <h2>{{ $t('home.intro-3') }}</h2>
          <p>
            {{ $t('home.intro-content-3') }}
          </p>
        </div>
        <div class="intro-img-container">
          <img
            src="https://images.unsplash.com/photo-1465808883813-7d2959af2252?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="intro-img"
          />
        </div>
      </div>
    </div>
    <div class="service homepage-block">
      <div class="service-1">
        <i class="bi bi-calendar-check-fill" style="font-size: 40px"></i>
        <h3>{{ $t('home.reservation') }}</h3>
        <p>
          {{ $t('home.reservation-content') }}
        </p>
      </div>
      <div class="service-2">
        <i class="bi bi-truck" style="font-size: 40px"></i>
        <h3>{{ $t('home.delivery') }}</h3>
        <p>
          {{ $t('home.delivery-content') }}
        </p>
      </div>
    </div>
    <div class="recommendation homepage-block block-title">
      <h2 class="text-center">
        <span>{{ $t('home.recommendation') }}</span>
      </h2>
      <div>
        <h3 class="mt-5">Cake</h3>
        <div class="recommendation-cards">
          <div v-for="product in filteredCake" :key="product.id">
            <RouterLink :to="`/product/${product.id}`">
              <div class="img-container">
                <img :src="product.imageUrl" alt="product-img" />
              </div>
              <h5 v-if="$i18n.locale === 'zh-TW'">{{ product.title }}</h5>
              <h5 v-if="$i18n.locale === 'en'">{{ product.en.title }}</h5>
            </RouterLink>
            </div>
        </div>
      </div>
      <div>
        <h3 class="mt-5">Tart</h3>
        <div class="recommendation-cards">
          <div v-for="product in filteredTart" :key="product.id">
            <RouterLink :to="`/product/${product.id}`">
              <div class="img-container">
                <img :src="product.imageUrl" alt="product-img" />
              </div>
              <h5 v-if="$i18n.locale === 'zh-TW'">{{ product.title }}</h5>
              <h5 v-if="$i18n.locale === 'en'">{{ product.en.title }}</h5>
            </RouterLink>
            </div>
        </div>
      </div>
    </div>
    <div class="blog homepage-block">
      <h2 class="text-center block-title">
        <RouterLink to="/blogs"><span>{{ $t('home.blog') }}</span></RouterLink>
      </h2>
      <div class="blog-cards">
        <div v-for="article in filteredBlog" :key="article.id">
          <RouterLink :to="`/blog/${article.id}`">
            <div class="img-container">
              <img :src="article.image" alt="blog-img" />
            </div>
            <h5 v-if="$i18n.locale === 'zh-TW'">{{ article.title }}</h5>
            <h5 v-if="$i18n.locale === 'en'">{{ article.en.title }}</h5>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      blogs: [],
      status: {
        productsLoading: false,
        blogsLoading: false,
      },
    };
  },
  watch: {
    '$i18n.locale': {
      handler() {
        this.getData();
        this.getArticle();
      },
      deep: true,
    },
  },
  methods: {
    getData() {
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/products/all`;
      this.status.productsLoading = true;
      axios
        .get(url)
        .then((response) => {
          this.status.productsLoading = false;
          this.products = response.data.products;
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
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
  computed: {
    filteredCake() {
      return this.products
        .filter((item) => item.category === '起司蛋糕')
        .slice(0, 3);
    },
    filteredTart() {
      return this.products
        .filter((item) => item.category === '派 / 塔')
        .slice(0, 3);
    },
    filteredBlog() {
      return this.blogs.slice(0, 2);
    },
  },
  mounted() {
    this.getData();
    this.getArticle();
  },
};
</script>

<style scoped>

a {
  text-decoration: none;
}

.hero {
  height: 300px;
  padding-block: 5em;
  background-image: url('https://images.unsplash.com/photo-1690908216000-a2ddab239a13?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  opacity: 0.9;
  .hero-content {
    width: 80%;
  }
}

.intro-block {
  margin-top: 1em;
  height: 300px;
  display: grid;
  grid-template-columns: 6fr 4fr;
  gap: 2em;
  .intro-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &:nth-of-type(2) {
    grid-template-columns: 4fr 6fr;
  }
}

.intro {
  margin-top: 3em;
  img {
    width: 100%;
    border-radius: 10px;
  }
}

.service {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  .service-1 {
    border-right: solid 2px;
    padding-right: 2em;
  }
  .service-2 {
    padding-left: 2em;
  }
}

.block-title {
  margin-bottom: 2em;
  span {
    border-bottom: solid 2px;
  }
}

.intro-img-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.recommendation-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2em;
  h5 {
    margin-top: 1.5em;
    text-align: center;
  }
  img {
    border-radius: 15px;
  }
}

.blog-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2em;
  h5 {
    margin-top: 1.5em;
  }
  img {
    border-radius: 15px;
  }
}

.img-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  transition: all 0.5s;
    &:hover{
      transform: scale(1.02);
      cursor: pointer;
    }
}

.homepage-block {
  margin-bottom: 10em;
}

@media (max-width: 1024px) {
  .intro-block {
    margin-top: 3em;
    height: 800px;
    grid-template-columns: 1fr;
    .intro-img-container {
      grid-row: 2;
    }
    &:nth-of-type(2){
      grid-template-columns: 1fr;
    }
  }

  .service {
    grid-template-columns: 1fr;
    text-align: center;
    .service-1 {
      border-right: none;
      padding-right: 0em;
    }
    .service-2 {
      padding-left: 0em;
    }
  }
}

@media (max-width: 768px) {
  .intro-block {
    height: 450px;
  }

  .homepage-block {
    margin-bottom: 6em;
  }
  .recommendation-cards,
  .blog-cards {
    .img-container {
      height: 20vh;
    }
  }
}

@media (max-width: 576px) {
  .recommendation-cards,
  .blog-cards {
    .img-container {
      height: 10vh;
    }
  }
}
</style>
