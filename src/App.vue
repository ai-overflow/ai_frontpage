<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-toolbar-title>AI Playground</v-toolbar-title>
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
/* Fix Scrollbar over vuetify overlays */
.CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
  z-index: 3 !important;
}
</style>
