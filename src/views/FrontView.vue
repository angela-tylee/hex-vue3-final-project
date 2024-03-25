<template>
  <div class="wrapper">
    <div>
      <header class="bg-primary">
        <span class="logo">
          <RouterLink to="/"
            ><img src="../../public/logo/logo-cream.png" alt="logo"
          /></RouterLink>
        </span>
        <nav class="nav-bar" :class="{ active: isMenuOpen }">
          <ul class="nav-list">
            <li>
              <RouterLink
                to="/"
                class="text-cus-cream text-decoration-none"
                @click.prevent="toggleMenu"
              >
                Home</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/products"
                class="text-cus-cream text-decoration-none"
                @click.prevent="toggleMenu"
              >
                Desserts</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/blogs"
                class="text-cus-cream text-decoration-none"
                @click.prevent="toggleMenu"
              >
                Blog</RouterLink
              >
            </li>
            <li>
              <RouterLink
                to="/about"
                class="text-cus-cream text-decoration-none"
                @click.prevent="toggleMenu"
              >
                Our Story</RouterLink
              >
            </li>
          </ul>
          <ul>
            <li>
              <RouterLink
                to="/cart"
                class="text-cus-cream text-decoration-none"
                @click.prevent="toggleMenu"
              >
                <i
                  class="bi bi-cart-fill text-cus-cream"
                  style="font-size: 20px"
                ></i>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div class="mobile-menu" @click.prevent="toggleMenu">
          <i class="bi bi-list text-cus-cream"></i>
        </div>
      </header>
      <RouterView></RouterView>
    </div>
    <footer class="bg-primary">
      <div class="container footer-content text-cus-cream">
        <div class="footer-nav">
          <RouterLink to="/log-in" class="text-cus-cream text-decoration-none">
            登入後台 |
          </RouterLink>
          <RouterLink
            to="/admin/products"
            class="text-cus-cream text-decoration-none"
          >
            後台頁面</RouterLink
          >
        </div>
        <span class="text-cus-cream">copyright@angelalee</span>
        <p class="text-cus-cream">僅供學習使用，非商業用途</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

header {
  padding: 2em 3em;
  display: flex;
  align-items: center;
  nav {
    width: 100%;
    margin-inline: 2em;
    ul {
      list-style: none;
      display: flex;
      justify-content: flex-start;
      align-items: baseline;
      margin: 0;
      margin-top: 3em;
      li {
        margin: 1em;
      }
    }
  }
  .logo img {
    margin-top: 1em;
    width: 90px;
  }
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  margin: 0;
}

.menuToggle {
  display: none;
  cursor: pointer;
}

.bar {
  display: block;
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 5px 0;
}

footer {
  margin-top: 2em;
  padding-block: 2em;
  flex-shrink: 0; /* Prevent footer from shrinking */
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}

.mobile-menu {
  display: none;
}

@media (max-width: 590px) {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mobile-menu {
    display: block;
    cursor: pointer;
    i {
      font-size: 30px;
    }
  }

  .nav-bar {
    display: none; /* Initially hide the nav-bar */
    background-color: var(--bs-primary);
    position: absolute;
    padding-bottom: 2em;
    top: 115px;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .nav-bar.active {
    /* Show the nav-bar when active */
    display: block flex;
    flex-direction: column;
    align-items: center;
    .nav-list {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
    }
    ul {
      margin: 0;
      padding: 0;
    }
  }
}
</style>

<style scoped>
.nav-bar {
  a {
    border-bottom: transparent;
    width: 0;
    transition: all 0.2s;
  }

  a:hover {
    border-bottom: solid 2px var(--bs-cus-cream);
    width: 100%;
  }
}
</style>
