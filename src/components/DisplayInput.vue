<template>
  <div>
    <v-expansion-panels multiple>
      <v-expansion-panel
        v-for="[name, item] of Object.entries(inputs)"
        :key="name"
      >
        <v-expansion-panel-header>
          {{ name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <h3>Vorschau</h3>
          <v-file-input
            truncate-length="15"
            v-if="['image'].includes(item.type)"
            :label="item.label"
            v-model="inputData[name]"
          ></v-file-input>
          <v-container v-if="['checkbox'].includes(item.type)">
            {{ item.label }}
            <v-checkbox
              v-for="el in item.values"
              :key="el"
              :label="el"
              color="primary"
              hide-details
              v-model="inputData[name]"
              :value="el"
            ></v-checkbox>
          </v-container>
          <v-radio-group v-if="['radio'].includes(item.type)" v-model="inputData[name]">
            <v-radio
              v-for="el in item.values"
              :key="el"
              :label="el"
              :value="el"
            ></v-radio>
          </v-radio-group>
          <v-text-field
            v-if="['input'].includes(item.type)"
            :label="item.label"
            :rules="generateRules(item.values)"
            v-model="inputData[name]"
          />
          <v-textarea
            v-if="['textarea'].includes(item.type)"
            :label="item.label"
            v-model="inputData[name]"
          />
          <v-select
            v-if="['select', 'multiselect'].includes(item.type)"
            :items="item.values"
            item-text="state"
            item-value="abbr"
            label="Select"
            persistent-hint
            return-object
            single-line
            :multiple="item.type === 'multiselect'"
            v-model="inputData[name]"
          ></v-select>
          <v-slider
            v-if="['slider'].includes(item.type)"
            :min="item.values.min"
            :max="item.values.max"
            :step="item.values.stepSize"
            v-model="inputData[name]"
          />
          <v-spacer />
          <h3>JSON</h3>
          <pre>{{ item }}</pre>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import { VCheckbox } from "vuetify";

export default {
  props: {
    inputs: Object,
    value: Object
  },
  components: { VCheckbox },
  created() {
    for(const [key, item] of Object.entries(this.inputs)) {
        if(item.type === 'checkbox') {
            this.inputData[key] = [];
            break;
        }
        console.log(this.inputData);
    }
  },
  data() {
      return {
          inputData: {}
      }
  },
  watch: {
      inputData: function() {
          this.$emit('input', this.inputData);
      }
  },
  methods: {
    generateRules(rules) {
      let ruleSet = [];
      if (rules.regex) {
        ruleSet.push(
          (v) =>
            !!(v || "").match(new RegExp(rules.regex)) || `Ungültige Eingabe`
        );
      }
      if (rules.length) {
        ruleSet.push(
          (v) =>
            (v || "").length >= rules.length.min ||
            `Minimale Länge: ${rules.length.min} Zeichen`
        );
        ruleSet.push(
          (v) =>
            (v || "").length <= rules.length.max ||
            `Maximale Länge: ${rules.length.max} Zeichen`
        );
      }

      return ruleSet;
    },
  },
};
</script>

<style>
</style>