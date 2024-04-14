<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <header class="bg-primary"
      :class="{ 'fixed-nav': isFixed }" ref="nav">
        <div class="container header-content">
          <span class="logo">
            <RouterLink to="/"
              ><img src="../../public/logo/logo-cream.png" alt="logo"
            /></RouterLink>
          </span>
          <nav class="nav-bar" :class="{ active: isMenuOpen }">
            <ul class="nav-list">
              <li>
                <RouterLink
                  to="/products"
                  class="text-cus-cream text-decoration-none"
                  @click.prevent="toggleMenu"
                >
                  {{ $t('header.products') }}</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/blogs"
                  class="text-cus-cream text-decoration-none"
                  @click.prevent="toggleMenu"
                >
                  {{ $t('header.blogs') }}</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/about"
                  class="text-cus-cream text-decoration-none"
                  @click.prevent="toggleMenu"
                >
                {{ $t('header.about') }}</RouterLink
                >
              </li>
            </ul>
            <ul>
              <li class="cart-icon-container">
                <RouterLink
                  to="/cart"
                  class="text-cus-cream"
                  @click.prevent="toggleMenu"
                >
                  <i
                    class="bi bi-cart-fill text-cus-cream cart-icon"
                    style="font-size: 25px" :value="cartQty"
                  ></i>
                </RouterLink>
              </li>
              <div class="language-icon-container" style="font-size: 10px; text-align: center">
                <i class="bi bi-translate text-cus-cream language-icon" style="font-size: 20px"
                @click="toggleLanguage"></i>
                <br>
                <span class="text-cus-cream" v-if="$i18n.locale === 'en'">English</span>
                <span class="text-cus-cream" v-if="$i18n.locale === 'zh-TW'">繁體中文</span>
              </div>
            </ul>
          </nav>
          <div class="mobile-menu" @click.prevent="toggleMenu">
            <i class="bi bi-list text-cus-cream"></i>
          </div>
        </div>
      </header>
        <RouterView></RouterView>
    </div>
    <footer class="bg-primary">
      <div class="container footer-content text-cus-cream">
        <div class="footer-nav">
          <RouterLink to="/log-in" class="text-cus-cream text-decoration-none">
            {{ $t('footer.log-in') }} |
          </RouterLink>
          <RouterLink
          to="/admin/products"
          class="text-cus-cream text-decoration-none"
          >
          {{ $t('footer.admin') }}</RouterLink
          >
        </div>
        <span class="text-cus-cream">copyright@angelalee</span>
        <p class="text-cus-cream mb-0">{{ $t('footer.for-learning') }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import cartStore from '../stores/cartStore';

export default {
  data() {
    return {
      isMenuOpen: false,
      isFixed: false,
    };
  },
  watch: {
    'this.carts': {
      handler() {
        this.getCartQty();
      },
    },
  },
  computed: {
    ...mapState(cartStore, ['cartQty']),
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    ...mapActions(cartStore, ['getCart', 'getCartQty', 'changeCartQty']),
    toggleLanguage() {
      if (this.$i18n.locale === 'zh-TW') {
        this.$i18n.locale = 'en';
      } else {
        this.$i18n.locale = 'zh-TW';
      }
    },
    fixNav() {
      if (window.scrollY > 0) {
        this.isFixed = true;
      } else {
        this.isFixed = false;
      }
    },
  },
  mounted() {
    this.getCart();
    this.nav = this.$refs.nav;
    window.addEventListener('scroll', this.fixNav);
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

.header-content {
  padding-block: 2em;
  display: flex;
  align-items: center;
  gap: 1.5em;
  .nav-bar {
    width: 100%;
    margin-inline: 2em;
    display: flex;
    justify-content: space-between;
    margin: 0;
    ul {
      list-style: none;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 0;
      padding: 0;
      li {
        margin: 1em;
      }
    }
    .language-icon-container {
      transition: all 0.1s;
      &:hover{
        cursor: pointer;
        transform: scale(1.1);
      }
    }
    .cart-icon-container {
      transition: all 0.1s;
      &:hover{
        transform: scale(1.1);
      }
    }
    .cart-icon {
      position: relative;
        &::after {
        content: attr(value);
        text-align: center;
        font-size: 0.8rem;
        padding: 0.5px;
        padding-left: 0;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: var(--bs-cus-brown);
        position: absolute;
        left: 18px;
      }
    }
  }
  .logo {
    width: 90px;
    img {
      width: 100%;
    }
  }
}

/* sticky nav */
.fixed-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* hamburger menu */
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

.mobile-menu {
  display: none;
}

footer {
  margin-top: 2em;
  padding-block: 2em;
  flex-shrink: 0;
  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}

@media (max-width: 590px) {
  header {
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      .logo {
        width: 50px;
        margin-top: 0;
      }
      .nav-bar {
        display: none;
        background-color: var(--bs-primary);
        position: absolute;
        padding-block: 1.5em;
        top: 50px;
        left: 0;
        width: 100%;
        z-index: 1000;
      }

      .nav-bar.active {
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
        .cart-icon {
          &::after {
            font-size: 1rem;
          }
        }
      }
    }
  }

  .mobile-menu {
    display: block;
    cursor: pointer;
    i {
      font-size: 30px;
    }
  }

  footer {
    height: 50px;
    padding-block: 1em;
    font-size: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .footer-nav {
      display: none;
    }
  }

}
</style>

<style scoped>
.nav-list {
  a {
    border-bottom: transparent;
    width: 0;
    transition: all 0.1s;
  }

  a:hover {
    border-bottom: solid 2px var(--bs-cus-cream);
    width: 100%;
  }
}
</style>
