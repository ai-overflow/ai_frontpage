<template>
  <v-expansion-panels>
    <v-expansion-panel
      v-for="[name, item] of Object.entries(connections)"
      :key="name"
    >
      <v-expansion-panel-header disable-icon-rotate>
        {{ name }}
        <template v-slot:actions v-if="entryPoint === name">
          <v-icon color="primary"> mdi-star </v-icon>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card color="primary">
          <v-card-title class="text-center justify-center white--text">
            <v-chip class="ma-2" label color="green">
              <v-icon left>mdi-web</v-icon>{{ item.method }}</v-chip
            >
            {{ item.protocol ? item.protocol.toLowerCase() : "http" }}://
            <v-text-field v-model="host" dark filled dense class="host-input" />
            : {{ item.port }}
            <var-text :value="item.path" :input-vars="inputVars" />
            <div class="ml-6">
              <v-btn
                small
                color="indigo lighten-1"
                dark
                @click="() => sendRequest(item)"
                >Go <v-icon right dark> mdi-send </v-icon></v-btn
              >
            </div>
          </v-card-title>
          <v-tabs
            background-color="primary"
            center-active
            dark
            centered
            v-model="tabs[item]"
          >
            <v-tab>Params</v-tab>
            <v-tab>Headers</v-tab>
            <v-tab>Body</v-tab>
          </v-tabs>
          <v-tabs-items v-model="tabs[item]">
            <v-tab-item
              v-for="tab in [item.params, item.headers]"
              :key="JSON.stringify(tab)"
            >
              <v-simple-table v-if="!!tab">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Wert</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="[k, v] of Object.entries(tab)" :key="k">
                      <td>{{ k }}</td>
                      <td><var-text :value="v" :input-vars="inputVars" /></td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <div v-else class="ma-2 text-center">Keine Angabe</div>
            </v-tab-item>
            <v-tab-item
              ><body-table
                v-if="item.body"
                :value="item.body"
                :input-vars="inputVars"
            /></v-tab-item>
          </v-tabs-items>
        </v-card>
        <v-container class="ma-2">
          <pre>
            {{ serverReply }}
          </pre>
        </v-container>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import VarText from "@/components/helper/VarText";
import BodyTable from "@/components/helper/BodyTable";
import doRequest from "@shared/helper/connection";
import { VTextField } from "vuetify/lib";

export default {
  props: {
    connections: Object,
    entryPoint: String,
    inputVars: Object,
    value: Object
  },
  data() {
    return {
      tabs: [],
      host: "localhost",
      serverReply: {},
    };
  },
  components: { VarText, BodyTable, VTextField },
  methods: {
    parseParams(input) {
      let re = /{{(.*?)}}/g;
      return input.replaceAll(re, (a, b) => {
        b = b.replace("input.", "");
        if (a && b && this.inputVars[b]) {
          return this.inputVars[b];
        } else {
          return a;
        }
      });
    },
    sendRequest(input) {
      doRequest(this.host, input, this.inputVars)
        .then((e) => {
          this.serverReply = e.data;
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    },
  },
  watch: {
    serverReply: function () {
      this.$emit("input", this.serverReply);
    },
  },
};
</script>

<style scoped>
.host-input {
  max-width: 150px;
  text-align: center;
}
</style>