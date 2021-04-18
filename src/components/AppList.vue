<template>
  <div>
    <h2>Projekte</h2>
    <v-container>
      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="indigo--text"
          multiple
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="item.project_name + index" :to="'/project/' + index">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title
                    v-text="item.project_name"
                  ></v-list-item-title>

                  <v-list-item-subtitle class="text--primary">{{
                    item.authors.join(", ")
                  }}</v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-text="item.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text class="pink--text">TODO</v-list-item-action-text>

                  <v-icon v-if="!active" color="grey lighten-1">
                    mdi-send-outline
                  </v-icon>

                  <v-icon v-else color="indigo darken-3"> mdi-send </v-icon>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
          </template>
        </v-list-item-group>
      </v-list>
    </v-container>
  </div>
</template>

<script>
import GitService from "@/services/GitService";

export default {
  created() {
    console.log("Test");
    GitService.listProjects().then((e) => {
      this.items = e;
    });
  },
  data() {
    return {
      selected: [2],
      items: [],
    };
  },
};
</script>

<style>
</style>