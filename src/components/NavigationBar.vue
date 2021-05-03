<template>
  <v-navigation-drawer
    :permanent="!$vuetify.breakpoint.xsOnly"
    expand-on-hover
    dark
    app
  >
    <v-list nav dense>
      <v-list-item class="mb-2">
        <v-list-item-icon>
          <v-icon>mdi-atom</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Administration</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav dense>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard", link: "/" },
        {
          title: "Seitenübersicht",
          icon: "mdi-book-open-page-variant",
          link: "/pages",
        },
        {
          title: "Projekte Auflisten",
          icon: "mdi-format-list-bulleted",
          link: "/projects",
        },
        {
          title: "Playground",
          icon: "mdi-controller-classic",
          link: "/playground",
        },
        {
          title: "Container Verwaltung",
          icon: "mdi-docker",
          link: "/docker",
        },
      ],
    };
  },
};
</script>

<style>
</style>