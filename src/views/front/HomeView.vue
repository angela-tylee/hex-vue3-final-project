<template>
  <div class="hero">
    <div class="hero-content container">
      <h1 class="text-cus-cream">
        Indulge in our mouth-watering dessert selection.
      </h1>
      <p class="text-cus-cream">Explore by flavor, type, or special offers!</p>
    </div>
  </div>
  <div class="container">
    <div class="intro homepage-block">
      <div class="intro-block">
        <div class="intro-content">
          <h2>品味匠心，手工美點</h2>
          <p>
            在每個甜點的背後，都蘊藏著一份匠心。我們的熟練工匠精心製作，每一口都是一場藝術的饗宴。無論是那一款蛋糕或是精緻的糕點，都讓您感受到家的溫暖和味蕾的滿足。
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
          <h2>純天然原料</h2>
          <p>
            我們將大自然的恩賜化為美味的魔法。
            從麵粉、雞蛋到奶油，每一種原料都經過精心挑選，讓您嘗到的不僅是味道，更是一份對健康和品質的堅持。讓我們的甜點，成為您與大自然的美好邂逅。
          </p>
        </div>
      </div>
      <div class="intro-block">
        <div class="intro-content">
          <h2>甜蜜魔法</h2>
          <p>
            來感受一場甜蜜的魔法之旅，
            從麵粉、雞蛋到奶油，每一步都是一場奇妙的舞蹈，融合出風味和口感的完美交響樂。讓我們的甜點，成為您味蕾上的奇幻冒險。
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
        <h3>3天前預訂</h3>
        <p>
          我們誠摯地請求您至少提前三天預約，讓我們有充足的時間，以最貼心、細緻的方式為您準備訂單
        </p>
      </div>
      <div class="service-2">
        <i class="bi bi-truck" style="font-size: 40px"></i>
        <h3>美味直送</h3>
        <p>
          我們非常高興地提供專屬於台灣顧客的送貨服務，帶著我們出色的產品直接送到您的家門口。期待能為您提供最優質的購物體驗！
        </p>
      </div>
    </div>
    <div class="recommendation homepage-block block-title">
      <h2 class="text-center">
        <span>Recommendation</span>
      </h2>
      <div>
        <h3 class="mt-5">Cake</h3>
        <div class="recommendation-cards">
          <div v-for="product in filteredCake" :key="product.id">
            <div class="img-container">
              <img :src="product.imageUrl" alt="product-img" />
            </div>
            <h5>{{ product.title }}</h5>
          </div>
        </div>
      </div>
      <div>
        <h3 class="mt-5">Tart</h3>
        <div class="recommendation-cards">
          <div v-for="product in filteredTart" :key="product.id">
            <div class="img-container">
              <img :src="product.imageUrl" alt="product-img" />
            </div>
            <h5>{{ product.title }}</h5>
          </div>
        </div>
      </div>
    </div>
    <div class="blog homepage-block">
      <h2 class="text-center block-title">
        <span>Explore our blog</span>
      </h2>
      <div class="blog-cards">
        <div v-for="article in filteredBlog" :key="article.id">
          <div class="img-container">
            <img :src="article.image" alt="blog-img" />
          </div>
          <h5>{{ article.title }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    getArticle() {
      this.status.blogsLoading = true;
      const url = `${VITE_API_URL}/api/${VITE_API_PATH}/articles`;
      axios
        .get(url)
        .then((response) => {
          this.status.blogsLoading = false;
          console.log(response.data.articles);
          this.blogs = response.data.articles;
        })
        .catch((err) => {
          this.status.blogsLoading = false;
          alert(err.response.data.message);
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
.homepage-block {
  margin-top: 5em;
}

.recommendation-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* justify-content: space-around; */
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
  /* justify-content: space-around; */
  gap: 2em;
  h5 {
    margin-top: 1.5em;
  }
  img {
    border-radius: 15px;
  }
}

.hero {
  height: 300px;
  padding-block: 5em;
  background-image: url('https://images.unsplash.com/photo-1690908216000-a2ddab239a13?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  opacity: 0.9;
  /* filter: grayscale(20%); */
  .hero-content {
    width: 80%;
  }
}

.intro-block {
  margin-top: 3em;
  height: 600px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2em;
  .intro-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.intro {
  img {
    width: 100%;
    border-radius: 10px;
  }
}

.service {
  margin-top: 3em;
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

.img-container {
  width: 100%;
  height: 300px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (max-width: 1024px) {
  .intro-block {
    grid-template-columns: 1fr;
    gap: 2em;
    .img-container {
      grid-row: 2;
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
  .recommendation-cards,
  .blog-cards {
    grid-template-columns: 1fr;
  }
}
</style>
