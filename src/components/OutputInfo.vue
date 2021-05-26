<template>
  <div>
    <div v-for="[name, item] of Object.entries(output)" :key="name">
      <h4>{{ parseParams(item.label || name) }}</h4>
      <div
        v-if="item.repeat && item.repeat.iterator"
        class="limited-height-container"
      >
        <div>
          <!-- TODO -->
          <OutputGenerator
            :output="item"
            :inputVars="inputVars"
            :outputVars="connectionData"
            v-model="models[generateLinkDir(item.format.link)]"
            :highlight="models[name]"
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