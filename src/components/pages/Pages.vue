<template>
  <v-card class="ma-4 pa-4">
    <h2>Seiten</h2>
    <v-container>
      <v-btn color="primary" to="/create/page" small>
        <v-icon dark left> mdi-book-plus-multiple </v-icon>
        Hinzufügen
      </v-btn>
    </v-container>
    <v-container>
      <span v-if="items.length === 0">Keine Seiten vorhanden</span>
      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          active-class="indigo--text"
          multiple
        >
          <template v-for="(item, index) in items">
            <v-list-item :key="item.name + index" :to="'/page/' + item.id">
              <template v-slot:default="{ active }">
                <v-list-item-content>
                  <v-list-item-title v-text="item.name"></v-list-item-title>

                  <v-list-item-subtitle class="text--primary">{{
                    item.description.substr(0, 255)
                  }}</v-list-item-subtitle>

                  <v-list-item-subtitle
                    v-text="item.description"
                  ></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-list-item-action-text class="pink--text"
                    >TODO</v-list-item-action-text
                  >

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
  </v-card>
</template>

<script>
import PageService from "@service/PageService";

export default {
  created() {
    //TODO: This will be called multiple times, replace with somthing better
    console.log("Test");
    PageService.listPages().then((e) => {
      console.log(e);
      this.items = e;
    });
  },
  data() {
    return {
      items: [],
    };
  },
};
</script>

<style>
</style>