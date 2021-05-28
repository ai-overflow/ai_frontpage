<template>
  <div>
    <div v-for="[name, item] of Object.entries(output)" :key="name" class="mt-10">
      <h3>{{ parseParams(item.label || name) }}</h3>
      <div
        v-if="item.repeat && item.repeat.iterator"
        class="limited-height-container"
      >
        <div v-for="[i, el] of [...parseIterator(item.repeat.iterator)].entries()" :key="i">
          <strong>{{parseIterator(item.repeat.title)[i]}}</strong>
          <!-- TODO -->
          <OutputGenerator
            :output="item"
            :inputVars="inputVars"
            :outputVars="connectionData"
            v-model="models[generateLinkDir(item.format.link)]"
            :highlight="models[name]"
            :iterator="el"
          />
        </div>
      </div>
      <div v-else class="limited-height-container">
        <OutputGenerator
          :output="item"
          :inputVars="inputVars"
          :outputVars="connectionData"
          v-model="models[generateLinkDir(item.format.link)]"
          :highlight="models[name]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OutputGenerator from "@shared/components/output/OutputGenerator";
import { paramParser } from "@shared/helper/paramParser";

export default {
  props: {
    output: Object,
    connectionData: Object,
    inputVars: Object,
    entryPoint: String,
  },
  components: { OutputGenerator },
  methods: {
    parseIterator(str) {
      return paramParser.parseIterator(str);
    },
    parseParams(str) {
      return paramParser.parseParams(str);
    },
    getHighlighting(link) {
      if (!link || !link.with || !link.field || !this.output[link.with]) return;

      return this.output[link.with][link.field];
    },
    generateLinkDir(link) {
      if (!link || !link.with || !this.output[link.with]) return;

      return link.with;
    },
  },
  data() {
    return {
      models: {},
    };
  },
};
</script>

<style>
.limited-height-container {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>