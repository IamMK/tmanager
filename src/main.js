import { createApp } from "vue";
import Master from "./components/layouts/Master.vue";
import store from "./store";
import router from "./router";

createApp(Master).use(store).use(router).mount("#app");

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.loggedIn) {
      next({
        name: "login",
      });
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (store.getters.loggedIn) {
      next({
        name: "tmanager",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});
