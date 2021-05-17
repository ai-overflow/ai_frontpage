<template>
  <div>
    <div v-for="[name, item] of Object.entries(output)" :key="name">
      <h4>{{ parseParams(item.label || name) }}</h4>
      <div
        v-if="item.repeat && item.repeat.enable"
        class="limited-height-container"
      >
        <div>
          <!-- TODO -->
          <OutputGenerator
            :connectionData="connectionData"
            :output="item"
            :inputVars="inputVars"
          />
        </div>
      </div>
      <div v-else class="limited-height-container">
        <OutputGenerator
          :connectionData="connectionData"
          :output="item"
          :inputVars="inputVars"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OutputGenerator from "@shared/components/output/OutputGenerator";
import { parseParams } from "@shared/helper/paramParser";

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
      return parseParams(str, this.inputVars, this.connectionData);
    },
  }
};
</script>

<style>
.limited-height-container {
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>