<template>
  <v-container class="form-container">
    <v-row>
      <v-col>
        <v-text-field
          label="Git-URL"
          v-model="gitURL"
          append-outer-icon="mdi-send"
           @click:append-outer="downloadGit"
          filled
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <AppList />
    </v-row>
  </v-container>
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

<style scoped>
.form-container {
  max-width: 500px;
}
</style>