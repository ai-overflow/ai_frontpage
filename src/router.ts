import Vue from 'vue';
import Router from 'vue-router';
import CreateApp from "@pages/CreateApp.vue";
import Home from "@pages/Home.vue";
import AppList from "@pages/AppList.vue";
import AppDetails from "@pages/AppDetails.vue";
import Playground from "@pages/Playground.vue";
import DockerControl from "@pages/DockerControl.vue";
import Pages from "@pages/Pages.vue";

const config: any = require("../vue.config");

Vue.use(Router);

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      icon: "mdi-view-dashboard",
      showInNav: true
    }
  },
  {
    path: "/create",
    name: "Create",
    component: CreateApp,
    meta: {
      icon: "mdi-book-open-page-variant",
      showInNav: false
    }
  },
  {
    path: "/projects",
    name: "List",
    component: AppList,
    meta: {
      icon: "mdi-book-open-page-variant",
      showInNav: false
    }
  },
  {
    path: "/project/:id",
    name: "Details",
    component: AppDetails,
    meta: {
      icon: "mdi-book-open-page-variant",
      showInNav: false
    }
  },
  {
    path: "/validate",
    name: "Validierung",
    component: Playground,
    meta: {
      icon: "mdi-controller-classic",
      showInNav: true
    }
  },
  {
    path: "/docker",
    name: "Docker",
    component: DockerControl,
    meta: {
      icon: "mdi-book-open-page-variant",
      showInNav: false
    }
  },
  {
    path: "/pages",
    name: "Pages",
    component: Pages,
    meta: {
      icon: "mdi-book-open-page-variant",
      showInNav: false
    }
  }
];

const router = new Router({
  mode: 'hash',
  routes: routes,
  base: config.publicPath
});

export default router;