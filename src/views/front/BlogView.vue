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
      <h1 class="fw-bold">Blog</h1>
      <p>This is sub-title. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
    </div>
    <div class="blog-content">
      <p>Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Voluptatem explicabo,
      aperiam repellat est asperiores quam
      voluptatibus iure quod sequi hic eveniet
      doloribus repellendus eos voluptate minima atque alias similique magni!</p>
      <p>Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Voluptatem explicabo,
      aperiam repellat est asperiores quam
      voluptatibus iure quod sequi hic eveniet
      doloribus repellendus eos voluptate minima atque alias similique magni!</p>
      <p>Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Voluptatem explicabo,
      aperiam repellat est asperiores quam
      voluptatibus iure quod sequi hic eveniet
      doloribus repellendus eos voluptate minima atque alias similique magni!</p>
      <p>Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Voluptatem explicabo,
      aperiam repellat est asperiores quam
      voluptatibus iure quod sequi hic eveniet
      doloribus repellendus eos voluptate minima atque alias similique magni!</p>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<script></script>

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
</style>
