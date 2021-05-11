<template>
  <div>
      <div
        v-for="[name, item] of Object.entries(inputs)"
        :key="name"
      >
          <h4>{{ item.label || name }}</h4>
          <InputGenerator :type-info="item" v-model="inputData[name]" />
          <!--
            <v-spacer />
            <h3>JSON</h3>
            <pre>{{ item }}</pre>
          -->
        </div>
  </div>
</template>

<script>
import InputGenerator from "@shared/components/input/InputGenerator";

export default {
  props: {
    inputs: Object,
    value: Object,
  },
  created: () => {
    console.log(InputGenerator);
  },
  components: { InputGenerator },
  data() {
    return {
      panel: Array.from(Array(Object.entries(this.inputs).length).keys()),
      inputData: {},
    };
  },
  watch: {
    inputData: function () {
      this.$emit("input", this.inputData);
    },
  },
};
</script>

<style>
</style>