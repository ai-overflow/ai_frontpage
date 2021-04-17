<template>
  <v-app>
    <v-app-bar color="indigo darken-2" dark>
      <v-icon large class="mr-4">mdi-atom</v-icon>

      <v-toolbar-title>AI Administration</v-toolbar-title>
    </v-app-bar>
    <navigation-bar />
    <router-view />
  </v-app>
</template>

<script>
import NavigationBar from "@/components/NavigationBar";

export default {
  name: "App",
  components: {
    NavigationBar,
  },
};
</script>

<style>
</style>
