<template>
  <!-- <div class="menu">
        <input type="checkbox" class="menu__toggler">
        <div class="menu__hamburger"><div class="menu__hamLines"></div></div>
        <div class="menu__content">
            <div class="menu__innerBody">
                <nav class="menu__nav">
                    <ul>
                        <li class="menu__element"><a class="menu__link" href="#">Home</a></li>
                        <li class="menu__element"><a class="menu__link" href="#">Blog</a></li>
                        <li class="menu__element"><a class="menu__link" href="#">Forum</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </div> -->

  <header>
    <easy-menu></easy-menu>
  </header>

  <main class="page">
    <router-view></router-view>
  </main>
</template>

<script>
import EasyMenu from "./Menu";
export default {
  components: {
    EasyMenu,
  },
};
</script>

<style lang="scss">
// CSS ZEROING
@import "./style/zero";
// CSS ZEROING
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  //   margin-top: 60px;
}

.nav {
  width: 100%;
  // height: 50px;
  display: flex;
  padding: 20px 50px;
  box-sizing: border-box;
  background-color: #ff8c00;
  &__container {
    display: flex;
    flex-direction: row;
    justify-content: left;
    width: 100%;
    @media screen and (max-width: 950px) {
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
  &__el {
    padding: 5px;
  }
  &__link {
    text-decoration: none;
    color: inherit;
  }
}

.page {
  // margin: 50px;
  width: 100%;
  height: 100vh;
}
</style>
