<template>
  <div>
    <div v-for="[name, item] of Object.entries(output)" :key="name">
      <h4>{{ item.label || name }}</h4>
      <div v-if="item.repeat && item.repeat.enable">
        <div>
          <!-- TODO -->
          <OutputGenerator
            :connectionData="connectionData"
            :output="item"
            :inputVars="inputVars"
          />
        </div>
      </div>
      <div v-else>
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

export default {
  props: {
    output: Object,
    connectionData: Object,
    inputVars: Object,
  },
  components: { OutputGenerator },
};
</script>

<style>
</style>