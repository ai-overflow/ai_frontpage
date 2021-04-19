<template>
  <div>
    <v-card class="ma-4 pa-4">
      <h2>YAML / JSON</h2>
      <codemirror v-model="description" />
    </v-card>
    <v-card class="ma-4 pa-4" v-if="description !== ''">
      <h2>Validierung</h2>
      <v-container>
        <v-alert
          border="left"
          :color="validationResult.valid ? 'primary' : 'red'"
          v-if="validationResult"
          light
          colored-border
          elevation="2"
          :type="validationResult.valid ? 'info' : 'error'"
        >
          {{ validationResult.valid ? "Erfolgreich" : "Fehler" }}
        </v-alert>
        <v-container v-if="validationResult.errors.length > 0">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Pfad</th>
                  <th class="text-left">Beschreibung</th>
                  <th class="text-left">Zusätzliche Informationen</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in validationResult.errors"
                  :key="item.property"
                >
                  <td>{{ item.property }}</td>
                  <td>{{ item.message }}</td>
                  <td>{{ getErrorFromSchema(item.schema) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-container>
      </v-container>
    </v-card>
    <v-card class="ma-4 pa-4" v-if="description !== ''">
      <h2>Verbindungen</h2>
      <v-expansion-panels>
        <v-expansion-panel
          v-for="[name, item] of Object.entries(getYamlData.connection)"
          :key="name"
        >
          <v-expansion-panel-header disable-icon-rotate>
            {{ name }}
            <template v-slot:actions v-if="getYamlData.entryPoint === name">
              <v-icon color="primary"> mdi-star </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            {{ item }}
            <v-card color="primary">
              <v-card-title class="text-center justify-center white--text">
                {{ item.method }}
                {{ item.protocol.toLowerCase() }}://localhost:{{ item.port
                }}{{ item.path }}
              </v-card-title>
              <v-tabs background-color="primary" center-active dark centered>
                <v-tab>Params</v-tab>
                <v-tab>Headers</v-tab>
                <v-tab>Body</v-tab>
              </v-tabs>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <v-card class="ma-4 pa-4" v-if="description !== ''">
      <h2>Eingabe</h2>
      <v-container v-if="getYamlData && getYamlData.input">
        <DisplayInput :inputs="getYamlData.input" v-model="inputData" />
      </v-container>
    </v-card>
    <v-card class="ma-4 pa-4" v-if="description !== ''">
      <h2>JSON-Repräsentation</h2>
      <pre>{{ inputData }}</pre>
    </v-card>
  </div>
</template>

<script>
import yaml from "js-yaml";
import DisplayInput from "@/components/DisplayInput";
import { codemirror } from "vue-codemirror";
import validationSchema from "@/assets/dlschema.json";
import { Validator } from "jsonschema";

// jsondiffpatch
// js-yaml
// jsonschema
export default {
  data() {
    return {
      description: "",
      validationResult: undefined,
      inputData: {},
    };
  },
  watch: {
    description: function () {
      var v = new Validator();
      this.validationResult = v.validate(this.getYamlData, validationSchema);
      console.log(this.validationResult);
    },
  },
  computed: {
    getYamlData() {
      return yaml.load(this.description);
    },
  },
  components: { DisplayInput, codemirror },
  methods: {
    getErrorFromSchema(schema) {
      if (schema.oneOf) {
        return schema.oneOf.map((e) => e.const);
      }
    },
  },
};
</script>

<style>
</style>