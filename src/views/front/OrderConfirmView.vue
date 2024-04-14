<template>
  <div class="container">
    <div class="grid">
      <div class="check-icon-block">
        <i class="bi bi-check-circle" style="font-size: 8rem"></i>
        <p>{{ $t('confirm.thanks') }}</p>
        <div class="check-icon-button">
          <RouterLink to="/">
            <button type="button" class="btn btn-primary">
              {{ $t('confirm.home') }}
            </button>
          </RouterLink>
          <RouterLink to="/products">
            <button type="button" class="btn btn-outline-primary">
              {{ $t('confirm.shopping') }}
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
  <RouterView></RouterView>
</template>

<style scoped>

.container {
  margin-block: 8em 5em;
}

.content {
  margin-top: 2em;
  padding: 2em;
  border-radius: 20px;
}

.check-icon-block{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.check-icon-button {
  display: flex;
  justify-content: space-around;
  gap: 1em;
  margin-top: 1em;
  button {
    width: 180px;
    font-size: 0.8rem;
  }
}

</style>
