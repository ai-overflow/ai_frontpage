<template>
  <div>
    <v-tabs
      fixed-tabs
      v-model="tabs"
      center-active
      background-color="secondary"
      dark
    >
      <v-tab v-for="[name] of Object.entries(connections)" :key="name">
        {{ name }}
        <v-icon v-if="entryPoint === name">mdi-star</v-icon></v-tab
      >
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item
        v-for="[name, item] of Object.entries(connections)"
        :key="name"
      >
        <v-card color="primary" outlined class="rounded-0">
          <v-card-title class="text-center justify-center white--text">
            <v-chip class="ma-2" label color="green">
              <v-icon left>mdi-web</v-icon>{{ item.method }}</v-chip
            >
            {{ item.protocol ? item.protocol.toLowerCase() : "http" }}://
            <v-text-field v-model="host" dark filled dense class="host-input" />
            : {{ item.port }}
            <var-text :value="item.path" :input-vars="inputVars" />
          </v-card-title>
          <v-tabs
            background-color="primary"
            center-active
            dark
            centered
            v-model="paramTabs[item]"
          >
            <v-tab>Params</v-tab>
            <v-tab>Headers</v-tab>
            <v-tab>Body</v-tab>
          </v-tabs>
          <v-tabs-items v-model="paramTabs[item]" class="pt-5 pb-5">
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
                      <td>
                        <var-text :value="v" :input-vars="inputVars" />
                      </td>
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
          <h3 class="text-center">
            <v-btn color="primary" dark @click="() => sendRequest(item, name)"
              >Abschicken
              <v-icon right dark> mdi-send </v-icon>
            </v-btn>
          </h3>
        </v-container>
        <div v-if="serverReply[name]">
          <v-container class="output-bar">
            <h3 class="text-center">Ausgabe</h3>
          </v-container>
          <v-container class="preview-container">
            <pre>
            {{ serverReply[name].value }}
            </pre>
          </v-container>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import BodyTable from "@/components/helper/BodyTable";
import { VTextField } from "vuetify/lib";
import VarText from "@/components/helper/VarText";
import doRequest from "@shared/helper/connection";

export default {
  props: {
    connections: Object,
    entryPoint: String,
    inputVars: Object,
    value: Object,
  },
  data() {
    return {
      tabs: null,
      paramTabs: [],
      host: "localhost",
      serverReply: {},
    };
  },
  components: {
    VarText,
    BodyTable,
    VTextField,
  },
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
    sendRequest(input, name) {
      doRequest(this.host, input, this.inputVars)
        .then((e) => {
          this.$set(this.serverReply, name, { success: true, value: e.data });
          //this.serverReply[name] = { success: true, value: e.data };
        })
        .catch((e) => {
          console.log("Error: ", e);
          this.$set(this.serverReply, name, {
            success: false,
            value:
              e.message +
              "\nSee Browser Developement Console (Chrome: F12) for more information.",
          });
        });
    },
  },
  watch: {
    serverReply: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          this.$emit("input", this.serverReply);
          //console.log(JSON.stringify(this.serverReply));
        });
      },
    },
  },
};
</script>

<style scoped>
.host-input {
  max-width: 150px;
  text-align: center;
}
.preview-container {
  max-height: 400px;
  overflow-y: auto;
  /*width: calc(100% - 10px);*/
  border: thin solid var(--v-secondary-base);
  margin: 0px 0;
}
.output-bar {
  background: var(--v-secondary-base);
  color: #fff;
}
</style>