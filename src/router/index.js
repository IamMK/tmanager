import { createRouter, createWebHistory } from "vue-router";
import LandingPage from "../components/marketing/LandingPage.vue";
import App from "../App.vue";
import About from "../components/marketing/About.vue";
import Login from "../components/auth/Login.vue";
import Logout from "../components/auth/Logout.vue";
import Register from "../components/auth/Register.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: LandingPage,
  },
  {
    path: "/tasks",
    name: "tmanager",
    component: App,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
    meta: {
      requiresVisitor: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
