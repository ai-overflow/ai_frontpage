<template>
  <div>
    <TooltipGenerator
      :validationResult="validationResult"
      :connectionData="connectionData"
      :currentStep="currentStep"
      :description="description"
      :yamlData="getYamlData"
    />
    <v-stepper non-linear v-model="currentStep">
      <v-stepper-header>
        <v-stepper-step :complete="currentStep > 1" step="1" editable>
          Modell Validierung
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step
          :complete="currentStep > 2"
          step="2"
          :editable="maxStep > 1"
        >
          Eingabe und Verbindung
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :editable="maxStep > 2">
          Ausgabe
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="ma-4 pa-4" elevation="0">
            <h2>YAML / JSON</h2>
            <h2 class="subtitle-1">
              Bitte fügen Sie ihre <code>config.dl.yaml</code> oder
              <code>config.dl.json</code> in den Editor zur Validierung ein:
            </h2>
            <codemirror
              v-model="description"
              :options="cmOptions"
              ref="myCm"
              class="cm"
            />
          </v-card>
          <v-card
            class="ma-4 pa-4"
            v-if="description !== '' && validationResult"
            elevation="0"
          >
            <h2>Validierung</h2>
            <v-container>
              <v-alert
                :color="validationResult.valid ? 'primary lighten-1' : 'red'"
                v-if="validationResult"
                light
                elevation="0"
                dense
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
          <v-row align="center" justify="space-around" class="ma-2">
            <v-btn
              color="primary"
              @click="currentStep = 2"
              :disabled="
                !validationResult ||
                !validationResult.valid ||
                description.length == 0
              "
            >
              Weiter
            </v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-container v-if="validationResult && validationResult.valid">
            <v-card class="ma-4 pa-4" v-if="description !== ''" elevation="0">
              <h2>Eingabe</h2>
              <v-container v-if="getYamlData && getYamlData.input">
                <DisplayInput :inputs="getYamlData.input" v-model="inputData" />
              </v-container>
            </v-card>
            <v-card class="ma-4 pa-4" v-if="description !== ''" elevation="0">
              <h2>JSON-Repräsentation</h2>
              <pre>{{ inputData }}</pre>
            </v-card>
            <v-card class="ma-4 pa-4" v-if="description !== ''" elevation="0">
              <h2>Verbindungen</h2>
              <v-container v-if="getYamlData && getYamlData.connection" class="pa-0">
                <ConnectionInfo
                  :connections="getYamlData.connection"
                  :entry-point="getYamlData.entryPoint"
                  :input-vars="inputData"
                  v-model="connectionData"
                />
              </v-container>
            </v-card>
          </v-container>
          <v-row align="center" justify="space-around" class="ma-2">
            <v-btn @click="currentStep = 1"> Zurück </v-btn>
            <v-btn
              color="primary"
              @click="currentStep = 3"
              :disabled="!connectionData"
            >
              Weiter
            </v-btn>
          </v-row>
        </v-stepper-content>
        <v-stepper-content step="3">
          <v-alert
            text
            dense
            color="red"
            icon="mdi-emoticon-confused-outline"
            border="left"
          >
            Sie haben das Ende des Playgrounds erreicht. Der Schritt "Ausgabe"
            ist aktuell in Bearbeitung. Bitte warten Sie einige Tage...
          </v-alert>
          <v-container>
            <v-card class="ma-4 pa-4" v-if="description !== ''">
              <h2>Ausgabe</h2>
              <pre>TODO</pre>
            </v-card>
          </v-container>
          <v-row align="center" justify="space-around" class="ma-2">
            <v-btn @click="currentStep = 2"> Zurück </v-btn>
            <v-btn
              color="primary"
              @click="currentStep = 1"
              :disabled="!connectionData"
            >
              Fertig
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
import TooltipGenerator from "@/components/helper/TooltipGenerator";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/lint.css";

// jsondiffpatch
// js-yaml
// jsonschema
export default {
  data() {
    return {
      currentStep: 1,
      maxStep: 1,
      description: "# insert your description here\n\n",
      validationResult: undefined,
      validationError: undefined,
      inputData: {},
      connectionData: undefined,
      cmOptions: {
        lint: true,
        gutters: ["CodeMirror-lint-markers"],
        viewportMargin: Infinity,
      },
    };
  },
  watch: {
    description: function () {
      let v = new Validator();
      try {
        this.validationResult = v.validate(this.getYamlData, validationSchema);
        this.validationError = undefined;
      } catch (e) {
        this.validationResult = undefined;
        this.validationError = e;
      }
    },
    currentStep: function () {
      this.maxStep = Math.max(this.maxStep, this.currentStep);
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
        return result;
      }
      return [];
    });
  },
  components: {
    DisplayInput,
    ConnectionInfo,
    codemirror,
    TooltipGenerator,
  },
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