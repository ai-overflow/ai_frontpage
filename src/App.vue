<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title>AI Administration</v-toolbar-title>
    </v-app-bar>
    <navigation-bar />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
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
