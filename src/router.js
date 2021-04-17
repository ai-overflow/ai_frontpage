import { createWebHistory, createRouter } from "vue-router";
import CreateApp from "@/components/CreateApp.vue";
import Home from "@/components/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create",
    component: CreateApp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;