<template>
  <div>
    <v-card>
      <v-text-field
        label="Git-URL"
        hide-details="auto"
        v-model="gitURL"
      ></v-text-field>
      <v-btn @click="downloadGit">herunterladen</v-btn>
    </v-card>
    <AppList />
  </div>
</template>

<script>
import GitService from "@/services/GitService";
import AppList from "@/components/AppList";

export default {
  data() {
    return {
      gitURL: "",
    };
  },
  components: {
    AppList,
  },
  methods: {
    downloadGit() {
      console.log("Downloading: ", this.gitURL);
      GitService.createProject(this.gitURL);
    },
  },
};
</script>

<style>
</style>