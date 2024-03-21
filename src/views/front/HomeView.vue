<template>
  <!-- <HelloWorld /> -->
  <div class="hero">
    <div class="hero-content container">
      <h1 class="text-cus-cream">Indulge in our mouth-watering dessert selection.</h1>
      <p class="text-cus-cream">Explore by flavor, type, or special offers!</p>
    </div>
  </div>
  <div class="container">
    <div class="intro">
      <div class="intro-block">
        <div class="intro-content">
          <h2>品味匠心，手工美點</h2>
          <p>在每個甜點的背後，都蘊藏著一份匠心。我們的熟練工匠精心製作，每一口都是一場藝術的饗宴。無論是那一款蛋糕或是精緻的糕點，都讓您感受到家的溫暖和味蕾的滿足。</p>
        </div>
        <img src="https://images.unsplash.com/photo-1549590143-d5855148a9d5?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="intro-img">
      </div>
      <div class="intro-block">
        <img src="https://images.unsplash.com/photo-1588467850695-a898367ce465?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="intro-img">
        <div class="intro-content">
          <h2>純天然原料</h2>
          <p>我們將大自然的恩賜化為美味的魔法。
            從麵粉、雞蛋到奶油，每一種原料都經過精心挑選，讓您嘗到的不僅是味道，更是一份對健康和品質的堅持。讓我們的甜點，成為您與大自然的美好邂逅。</p>
        </div>
      </div>
      <div class="intro-block">
        <div class="intro-content">
          <h2>甜蜜魔法</h2>
          <p>來感受一場甜蜜的魔法之旅，
            從麵粉、雞蛋到奶油，每一步都是一場奇妙的舞蹈，融合出風味和口感的完美交響樂。讓我們的甜點，成為您味蕾上的奇幻冒險。</p>
        </div>
        <img src="https://images.unsplash.com/photo-1465808883813-7d2959af2252?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="intro-img">
      </div>
    </div>
    <div class="recommendation">
      <h2>Recommendation</h2>
      <div>
        <h3>Cake</h3>
        <div class="recommendation-cards">
          <div>
            <img src="" alt="product-img">
            <h3>Product</h3>
          </div>
          <div>
            <img src="" alt="product-img">
            <h3>Product</h3>
          </div>
          <div>
            <img src="" alt="product-img">
            <h3>Product</h3>
          </div>
        </div>
      </div>
      <div>
        <h3>Tart</h3>
        <div class="recommendation-cards">
          <div>
            <img src="" alt="product-img">
            <h3>Product</h3>
          </div>
          <div>
            <img src="" alt="product-img">
            <h3>Product</h3>
          </div>
          <div>
            <img src="" alt="product-img">
            <h3>Product</h3>
          </div>
      </div>
      </div>
    </div>
    <div class="service">
      <div class="service-1">
        <i class="bi bi-calendar-check-fill" style="font-size: 40px"></i>
        <h3>3天前預訂</h3>
        <p>我們誠摯地請求您至少提前三天預約，讓我們有充足的時間，以最貼心、細緻的方式為您準備訂單</p>
      </div>
      <div class="service-2">
        <i class="bi bi-truck" style="font-size: 40px"></i>
        <h3>美味直送</h3>
        <p>我們非常高興地提供專屬於台灣顧客的送貨服務，帶著我們出色的產品直接送到您的家門口。期待能為您提供最優質的購物體驗！</p>
      </div>
    </div>
    <div class="blog">
      <h2>Explore our blog</h2>
      <div class="blog-cards">
        <div>
          <img src="" alt="blog-img">
          <h3>Blog Heading</h3>
        </div>
        <div>
          <img src="" alt="blog-img">
          <h3>Blog Heading</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue';

export default {
  components: {
    // HelloWorld,
  },
};
</script>

<style scoped>

h2,
h3 {
  margin-top: 1em;

}

.recommendation-cards,
.blog-cards {
  display: flex;
  justify-content: space-around;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2em;
}

.intro{
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
  .service-2{
    padding-left: 2em;
  }
}
</style>
