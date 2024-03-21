<template>
  <div class="container">
    <h1 class="border-primary">Blog</h1>
    <div class="blog-list">
      <div class="blog-card border-cus-cream">
        <div class="blog-card-content">
          <RouterLink to="/blog">
            <h3>Blog Title</h3>
          </RouterLink>
          <p></p>
        </div>
        <img src="" alt="blog-img">
      </div>
      <div class="blog-card border-cus-cream">
        <div class="blog-card-content">
          <RouterLink to="">
            <h3>Blog Title</h3>
          </RouterLink>
          <p></p>
        </div>
        <img src="" alt="blog-img">
      </div>
      <div class="blog-card border-cus-cream">
        <div class="blog-card-content">
          <RouterLink to="">
            <h3>Blog Title</h3>
          </RouterLink>
          <p></p>
        </div>
        <img src="" alt="blog-img">
      </div>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script></script>

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
