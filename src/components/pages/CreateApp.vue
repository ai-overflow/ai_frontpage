<template>
  <v-expansion-panels v-model="panel" multiple>
    <v-expansion-panel>
      <v-expansion-panel-header><h2>Projekt erstellen</h2></v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-container class="form-container">
          <v-row>
            <v-col>
              <v-alert
                border="left"
                color="pink darken-1"
                v-if="error"
                light
                colored-border
                elevation="2"
                type="error"
                >There was an error: {{ error }}</v-alert
              >
              <v-alert
                border="left"
                color="primary"
                v-if="success"
                light
                colored-border
                elevation="2"
                type="info"
                >Erfolgreich!</v-alert
              >
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Git-URL" v-model="gitURL" filled clearable>
                <template v-slot:prepend-inner v-if="loading"
                  ><v-progress-circular
                    size="24"
                    color="info"
                    indeterminate
                  ></v-progress-circular>
                </template>
                <template v-slot:append-outer
                  ><v-icon @click="downloadGit">mdi-send</v-icon></template
                >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row v-if="infoText">
            <v-col>
              <download-info :info="infoText" />
            </v-col>
          </v-row>
          <v-row v-if="projectId">
            <v-col>
              <v-btn :to="`/project/${projectId}`" color="primary" dark>Weiter zum Projekt</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import GitService from "@/services/GitService";
import DownloadInfo from "../DownloadInfo.vue";

export default {
  data() {
    return {
      gitURL: "",
      loading: false,
      error: "",
      success: false,
      infoText: undefined,
      projectId: undefined,
      panel: [0]
    };
  },
  components: { DownloadInfo },
  methods: {
    downloadGit() {
      console.log("Downloading: ", this.gitURL);
      this.loading = true;
      this.success = false;
      this.error = "";
      this.infoText = undefined;
      GitService.createProject(this.gitURL)
        .then((e) => {
          this.loading = false;
          console.log("e: ", e);

          if (e.error) {
            this.error = e.error;
          } else {
            this.success = true;
            this.infoText = e.abstract;
            this.projectId = e.projectID;
          }
        })
        .catch((e) => {
          this.loading = false;
          this.error = e;
          // TODO: Show Error
        });
    },
  },
};
</script>

<style scoped>
.form-container {
  max-width: 500px;
}
</style>