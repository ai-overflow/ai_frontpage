<template>
  <div>
    <v-card class="ma-4 pa-4">
      <h2>YAML / JSON</h2>
      <codemirror v-model="description" :options="cmOptions" ref="myCm" class="cm"/>
    </v-card>
    <v-card class="ma-4 pa-4" v-if="description !== '' && validationResult">
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
    <v-container v-if="validationResult && validationResult.valid">
      <v-card class="ma-4 pa-4" v-if="description !== ''">
        <h2>Verbindungen</h2>
        <v-container v-if="getYamlData && getYamlData.connection">
          <ConnectionInfo
            :connections="getYamlData.connection"
            :entry-point="getYamlData.entryPoint"
            :input-vars="inputData"
            v-model="connectionData"
          />
        </v-container>
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
      <v-card class="ma-4 pa-4" v-if="description !== ''">
        <h2>Ausgabe</h2>
        <pre>TODO</pre>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import yaml from "js-yaml";
import DisplayInput from "@/components/DisplayInput";
import ConnectionInfo from "@/components/ConnectionInfo";
import { codemirror } from "vue-codemirror";
import CodeMirror from "codemirror";
import validationSchema from "@/assets/dlschema.json";
import { Validator } from "jsonschema";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/lint.css";

// jsondiffpatch
// js-yaml
// jsonschema
export default {
  data() {
    return {
      description: "",
      validationResult: undefined,
      validationError: undefined,
      inputData: {},
      connectionData: {},
      cmOptions: {
        lint: true,
        gutters: ["CodeMirror-lint-markers"],
        viewportMargin: Infinity
      },
    };
  },
  watch: {
    description: function () {
      let v = new Validator();
      try {
        this.validationResult = v.validate(this.getYamlData, validationSchema);
        this.validationError = undefined;
        console.log(this.validationResult);
      } catch (e) {
        this.validationResult = undefined;
        this.validationError = e;
      }
    },
  },
  computed: {
    getYamlData() {
      return yaml.load(this.description);
    },
    codemirror() {
      if (this.$refs.myCm) {
        return this.$refs.myCm.codemirror;
      }
      return null;
    },
  },
  mounted() {
    CodeMirror.registerHelper("lint", "yaml", () => {
      if (this.validationError) {
      console.log("set error:", this.validationError);
        const cm = this.codemirror;
        if (!cm) return [];

        let start = cm.posFromIndex(this.validationError.mark.position);
        let end = Object.assign({}, start);

        end.ch = cm.getTokenAt(start).end;
        start.ch -= 1;

        const result = [
          {
            from: start,
            to: end,
            message: this.validationError.message,
            severity: "error",
          },
        ];
        console.log(result);
        return result;
      }
      return [];
    });
  },
  components: { DisplayInput, ConnectionInfo, codemirror },
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
.cm .CodeMirror {
  height: auto;
}
</style>