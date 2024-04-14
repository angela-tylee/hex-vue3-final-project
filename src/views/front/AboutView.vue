<!-- eslint-disable max-len -->
<template>
  <div class="container">
    <h1>{{ $t('header.about') }}</h1>
    <div v-if="$i18n.locale === 'zh-TW'"
      class="about-content fs-5">
      <div class="about-grid about-block">
        <div>
          <p>
            在一個夢想常常被實際考量擱置的世界裡，總有一些人足夠大膽，敢於打破常規，追隨不平凡的道路。讓我們來認識一下Angela，她是
            Sweet
            Treat背後的願景推動者，這是一個甜蜜的綠洲，激情與味蕾相遇，每一口都講述了野心和韌性的故事。
          </p>
          <p>
            28歲那年，Angela做了一個大膽的決定，離開了可預測的企業生活，開始了一段以糖、香料和一切美好為動力的旅程。憑藉著對所有
            甜食的熱愛和堅定的創業精神，她踏上了在烹飪領域開闢自己的領域之路。
          </p>
          <p>
            Sweet
            Treats的開端不僅僅是一次信任的飛躍，更是多年來她精煉技藝和培養夢想的成果。從在她謙遜的廚房裡嘗試複雜的食譜到不知疲
            倦地研究市場趨勢和消費者喜好，Angela將自己的心血投入到企業的每一個方面。
          </p>
        </div>
        <div class="img-container">
          <img
            src="https://images.unsplash.com/photo-1519733870-f96bef9bc85f?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image-1"
          />
        </div>
      </div>
      <div class="about-block">
        <p>
          但這不僅僅是關於創造令人垂涎的甜點；這是關於打造一個與品質、創新和最重要的是一絲喜悅相提並論的品牌。無論是完善法式甜點的
          藝術還是將傳統食譜注入現代元素，Angela都以對卓越的堅定承諾來對待她的工藝。
        </p>
        <p>
          當新鮮烘焙糕點的香氣飄過空氣，誘人的甜點陳列架上擺滿了豐盛的甜點時，Sweet
          Treat很快就不僅僅是一個烹飪目的地，它成為了激情和毅力的見證。
        </p>
        <p>
          但這段旅程並不是沒有遇到挑戰的。從應對創業的複雜性到經歷全球大流行病帶來的風暴，Angela用鋼鐵般的決心和不屈不撓的精神應對
          每一個障礙。每一次挫折都帶來了成長的機會，堅定了她將夢想化為現實的決心。
        </p>
        <p>
          如今，Sweet
          Treats作為創造力和工藝的標誌，吸引著來自各地的甜點愛好者，因其誘人的各種甜點而聞名。但超越櫃臺上展示的誘人美
          食，更重要的是一個女人勇於挑戰傳統，追求自己的激情的故事，這才是它真正的獨特之處。
        </p>
        <p>
          所以，加入Angela一起走進這段甜蜜的自我發現和慶祝之旅，每一口都充滿了一絲魔力和一點靈感。因為在Sweet
          Treats，生活就更甜蜜了一點點。
        </p>
      </div>
      <div class="img-container">
        <img
          src="https://images.unsplash.com/photo-1610057052613-bb574bb4e4c9?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image-2"
        />
      </div>
    </div>
    <div v-if="$i18n.locale === 'en'"
    class="about-content fs-5">
      <div class="about-grid about-block">
        <div>
          <p>
            In a world where dreams often take a backseat to practicality, there are those bold enough to break the mold and follow the path less traveled. Meet Angela, the visionary force behind Sweet Treats, a delectable oasis where passion meets palate, and where every bite tells a story of ambition and resilience.
          </p>
          <p>
            At the tender age of 28, Angela made a daring decision to depart from the predictable confines of corporate life and embark on a journey fueled by sugar, spice, and everything nice. Armed with a fervent love for all things sweet and an unwavering entrepreneurial spirit, she set out to carve her own niche in the culinary landscape.
          </p>
          <p>
            The inception of Sweet Treats was not merely a leap of faith, but a culmination of years spent honing her craft and nurturing her dreams. From experimenting with intricate recipes in her humble kitchen to tirelessly researching market trends and consumer preferences, Angela poured her heart and soul into every aspect of her fledgling enterprise.
          </p>
        </div>
        <div class="img-container">
          <img
            src="https://images.unsplash.com/photo-1519733870-f96bef9bc85f?q=80&w=2369&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image-1"
          />
        </div>
      </div>
      <div class="about-block">
        <p>
          But it was not just about creating mouthwatering confections; it was about building a brand synonymous with quality, innovation, and above all, a sprinkle of joy. Whether it was perfecting the art of French patisserie or infusing traditional recipes with a modern twist, Angela approached her craft with an unwavering commitment to excellence.

        </p>
        <p>
          As the aroma of freshly baked pastries wafted through the air and the tantalizing sight of decadent desserts adorned the shelves, Sweet Treats quickly became more than just a culinary destination—it became a testament to the power of passion and perseverance.
        </p>
        <p>
          But the journey did not come without its fair share of challenges. From navigating the intricacies of entrepreneurship to weathering the storm of a global pandemic, Angela faced each obstacle with steely determination and an indomitable spirit. And with every setback emerged an opportunity for growth, fortifying her resolve to turn dreams into reality.
        </p>
        <p>
          Today, Sweet Treats stands as a beacon of creativity and craftsmanship, attracting dessert aficionados from far and wide with its irresistible array of treats. But beyond the indulgent delights that grace its counters, it is the story of one woman’s courage to defy convention and pursue her passion that truly sets it apart.
        </p>
        <p>
          So come, join Angela on this sweet journey of self-discovery and celebration, where every bite is infused with a sprinkle of magic and a dash of inspiration. Because at Sweet Treats, life is just a little sweeter.
        </p>
      </div>
      <div class="img-container">
        <img
          src="https://images.unsplash.com/photo-1610057052613-bb574bb4e4c9?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="image-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

h1 {
  text-align: center;
  margin-top: 2em;
  padding-bottom: 0.5em;
  border-bottom: 2px solid;
}

.about-grid {
  display: grid;
  grid-template-columns: 6fr 4fr;
  gap: 2em;
  margin-top: 2em;
  img {
    width: 100%;
  }
}

.about-block {
  margin-top: 2em;
}

.img-container {
  img {
    width: 100%;
    border-radius: 10px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 930px;
  }
}

@media (max-width: 1200px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
}

</style>
