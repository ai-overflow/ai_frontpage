<template>
  <span>
    <span v-for="(el, i) of parseParamParts(value)" :key="i">
      <v-chip class="ma-2" label v-if="i % 2" dark>
        <v-icon left>mdi-code-braces-box</v-icon>
        {{ insertCutParamPart(el) }}
      </v-chip>
      <span v-else>{{ el }}</span>
    </span>
  </span>
</template>

<script>
import { cutStringLength } from "@shared/helper/utility";

export default {
  props: {
    value: String,
    inputVars: Object,
  },
  methods: {
    parseParamParts(input) {
      let re = /{{(.*?)}}/g;
      return input.split(re);
    },
    insertParamPart(part) {
      if (part.startsWith("input.")) {
        let rPart = part.replace("input.", "");
        if (this.inputVars[rPart]) {
          return this.inputVars[rPart];
        }
      }
      return part;
    },
    insertCutParamPart(part) {
      return cutStringLength(this.insertParamPart(part), 75)
    }
  },
};
</script>

<style>
</style>