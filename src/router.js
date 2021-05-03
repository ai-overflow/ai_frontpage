import Vue from 'vue';
import Router from 'vue-router';
import CreateApp from "@pages/CreateApp.vue";
import Home from "@pages/Home.vue";
import AppList from "@pages/AppList.vue";
import AppDetails from "@pages/AppDetails.vue";
import Playground from "@pages/Playground.vue";
import DockerControl from "@pages/DockerControl.vue";
import Pages from "@pages/Pages.vue";

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
  {
    path: "/docker",
    name: "Docker",
    component: DockerControl,
  },
  {
    path: "/pages",
    name: "Pages",
    component: Pages
  }
];

const router = new Router({
  mode: 'history',
  routes: routes,
});

export default router;