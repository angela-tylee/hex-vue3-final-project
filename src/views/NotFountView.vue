<template>
  <div class="container">
    <h2 class="text-primary text-opacity-75">404</h2>
    <p  class="text-opacity-75">
      Oops, the sweet treat you're looking for is missing! Let's get you back on track.
    </p>
    <!-- <p  class="text-opacity-75">{{ $t('404.p') }}</p> -->
    <button type="button" class="btn btn-outline-primary">
      <RouterLink to="/">Continue Shopping</RouterLink>
      <!-- <RouterLink to="/">{{ $t('404.button') }}</RouterLink> -->
    </button>
  </div>
  <RouterView></RouterView>
</template>

<style scoped>
.container {
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h2 {
  font-size: 10rem;
  font-weight: 700;
}
p {
  font-size: 1.5rem;
}
button {
  margin-top: 1em;
  &:hover {
    a {
      color: var(--bs-cus-cream);
    }
  }
}
a {
  text-decoration: none;
}
</style>
