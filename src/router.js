import Vue from 'vue';
import Router from 'vue-router';
import CreateApp from "@/components/CreateApp.vue";
import Home from "@/components/Home.vue";

Vue.use(Router);

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

const router = new Router({
  mode: 'history',
  routes: routes,
});

export default router;