import Vue from 'vue';
import Router from 'vue-router';
import CreateApp from "@/components/pages/CreateApp.vue";
import Home from "@/components/pages/Home.vue";
import AppList from "@/components/pages/AppList.vue";
import AppDetails from "@/components/pages/AppDetails.vue";
import Playground from "@/components/pages/Playground.vue";

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
  {
    path: "/projects",
    name: "List",
    component: AppList,
  },
  {
    path: "/project/:id",
    name: "Details",
    component: AppDetails,
  },
  {
    path: "/playground",
    name: "Playground",
    component: Playground,
  },
];

const router = new Router({
  mode: 'history',
  routes: routes,
});

export default router;