<template>
  <v-navigation-drawer permanent expand-on-hover dark>
    <v-list nav dense>
      <v-list-item v-for="item in items" :key="item.title" link :to="item.link">
        <v-list-item-icon>
          <v-icon>{{item.icon}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{item.title}}</v-list-item-title>
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
        { title: "Anwendung Erstellen", icon: "mdi-book-plus-multiple", link: "/create" }
      ],
    };
  },
};
</script>

<style>
</style>