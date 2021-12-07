<template>
  <!-- <div class="menu">
    <input type="checkbox" class="menu__toggler" />
    <div class="menu__hamburger"><div class="menu__hamLines"></div></div>
    <div class="menu__content">
      <div class="menu__innerBody">
        <nav class="menu__nav">
          <ul class="menu__container">
            <li class="menu__element">
              <router-link class="menu__link" :to="{ name: 'main' }">
                Home
              </router-link>
            </li>
            <li class="menu__element">
              <router-link class="menu__link" :to="{ name: 'tmanager' }">
                Tasks
              </router-link>
            </li>
            <li class="menu__element">
              <router-link class="menu__link" :to="{ name: 'about' }">
                About
              </router-link>
            </li>
            <li v-if="!loggedIn" class="menu__element">
              <router-link class="menu__link" :to="{ name: 'login' }">
                Login
              </router-link>
            </li>
            <li v-if="!loggedIn" class="menu__element">
              <router-link class="menu__link" :to="{ name: 'register' }">
                Register
              </router-link>
            </li>
            <li v-if="loggedIn" class="menu__element">
              <router-link class="menu__link" :to="{ name: 'logout' }">
                Logout
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div> -->

  <div class="menu">
    <input
      type="checkbox"
      @click="changeMenuVisibility"
      v-model="menuVisibility"
      :class="{ 'menu__toggler--checked': menuVisibility }"
      class="menu__toggler"
    />
    <div class="menu__hamburger"><div class="menu__hamLines"></div></div>
    <div class="menu__content">
      <div class="menu__innerBody">
        <nav class="menu__nav">
          <ul class="menu__container">
            <li class="menu__element">
              <router-link
                @click="changeMenuVisibility"
                class="menu__link"
                :to="{ name: 'main' }"
              >
                Home
              </router-link>
            </li>
            <li class="menu__element">
              <router-link
                @click="changeMenuVisibility"
                class="menu__link"
                :to="{ name: 'tmanager' }"
              >
                Tasks
              </router-link>
            </li>
            <li class="menu__element">
              <router-link
                @click="changeMenuVisibility"
                class="menu__link"
                :to="{ name: 'about' }"
              >
                About
              </router-link>
            </li>
            <li v-if="!loggedIn" class="menu__element">
              <router-link
                @click="changeMenuVisibility"
                class="menu__link"
                :to="{ name: 'login' }"
              >
                Login
              </router-link>
            </li>
            <li v-if="!loggedIn" class="menu__element">
              <router-link
                @click="changeMenuVisibility"
                class="menu__link"
                :to="{ name: 'register' }"
              >
                Register
              </router-link>
            </li>
            <li v-if="loggedIn" class="menu__element">
              <router-link
                @click="changeMenuVisibility"
                class="menu__link"
                :to="{ name: 'logout' }"
              >
                Logout
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    changeMenuVisibility() {
      this.$store.dispatch("changeMenuVisibility");
    },
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    menuVisibility() {
      return this.$store.getters.menuVisibility;
    },
  },
};
</script>

<style lang="scss">
$ham_overlayColor: #ff8c00;
$ham_menuSpeed: 0.7s;
$ham_buttonColor: #000;
$ham_fontColor: #fff;
$ham_circleSize: 240vw;
.menu {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  &__toggler {
    box-sizing: unset !important;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1001;
    cursor: pointer;
    width: 50px;
    height: 50px;
    opacity: 0;

    &--checked {
      & + .menu__hamburger > div {
        transform: rotate(135deg);

        &:before,
        &::after {
          transform: rotate(90deg);
          top: 0;
        }
      }
      &:hover {
        & > div {
          transform: rotate(225deg);
        }
      }

      & ~ .menu {
        &__content {
          visibility: visible;
          & > .menu__innerBody {
            transform: scale(1);
            transition-duration: $ham_menuSpeed;
            & > .menu__nav {
              opacity: 1;
            }
          }
        }
      }
    }
  }

  &__hamburger {
    box-sizing: unset;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    height: 40px;
    width: 40px;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__hamLines {
    position: relative;
    width: 100%;
    height: 2px;
    background-color: $ham_buttonColor;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;

    &:before,
    &:after {
      content: "";
      position: absolute;
      z-index: 1000;
      top: -10px;
      width: 100%;
      height: 2px;
      background: inherit;
    }

    &::after {
      top: 10px;
    }
  }

  &__content {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__innerBody {
    background: $ham_overlayColor;
    border-radius: 50%;
    width: $ham_circleSize;
    height: $ham_circleSize;
    display: flex;
    flex: none;
    align-items: center;
    justify-content: center;
    transform: scale(0);
    transition: 0.3s;
  }

  &__nav {
    text-align: center;
    max-width: 90vw;
    max-height: 100vh;
    opacity: 0;
    transition: 0.3s;
  }

  &__element {
    list-style: none;
    color: $ham_fontColor;
    font-size: 1.5rem;
    padding: 1rem;
  }

  &__link {
    transition: 0.3s;
    color: inherit;
    text-decoration: none;
  }
}
</style>
