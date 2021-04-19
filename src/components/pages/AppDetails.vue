<template>
  <v-card class="ma-4 pa-4">
    <h2>{{ projectData.name }}</h2>
    <v-container v-if="projectData.input">
      <DisplayInput :inputs="projectData.input" />
    </v-container>
  </v-card>
</template>

<script>
import GitService from "@/services/GitService";
import DisplayInput from "@/components/DisplayInput";

export default {
  data() {
    return {
      projectData: {},
    };
  },
  components: { DisplayInput },
  created() {
    this.loadProjectDetails();
  },
  methods: {
    loadProjectDetails() {
      let id = parseInt(this.$route.params.id);
      if (Number.isSafeInteger(id)) {
        GitService.getProjectDetails(id).then((e) => {
          if (!e.error) {
            this.projectData = e;
          }
        });
      }
    },
  },
};
</script>

<style>
</style>