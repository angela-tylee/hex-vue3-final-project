<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <header class="bg-primary">
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
        <p class="text-cus-cream mb-0">僅供學習使用，非商業用途</p>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

const { VITE_API_URL, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      isMenuOpen: false,
      carts: {},
      cartQty: 0,
      status: {
        cartLoading: false,
      },
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    getCart() {
      this.status.cartLoading = true;
      axios.get(`${VITE_API_URL}/api/${VITE_API_PATH}/cart`)
        .then((response) => {
          this.status.cartLoading = false;
          console.log(response);
          this.carts = response.data.data;
          this.getCartQty();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
          this.status.cartLoading = false;
        });
    },
    getCartQty() {
      this.cartQty = 0;
      this.carts.carts.forEach((cart) => {
        this.cartQty += cart.qty;
      });
    },
    changeCartQty(item, qty = 1) {
      const order = {
        product_id: item.product.id,
        qty,
      };
      axios.put(`${VITE_API_URL}/api/${VITE_API_PATH}/cart/${item.id}`, { data: order })
        .then(() => {
          this.getCart();
        })
        .catch((error) => {
          Swal.fire({
            title: error.response.data.message,
            confirmButtonColor: 'var(--bs-danger)',
          });
        });
    },
  },
  mounted() {
    this.getCart();
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
  flex-shrink: 0;
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
        z-index: 1;
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
