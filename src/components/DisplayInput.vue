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
          <v-text-field
            v-if="['input'].includes(item.type)"
            label=""
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
          ></v-select>
          <v-slider
            v-if="['slider'].includes(item.type)"
            :min="item.values.min"
            :max="item.values.max"
            :step="item.values.stepSize"
            thumb-label="always"
          />
          <pre>{{ item }}</pre>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  props: {
    inputs: Object,
  },
  created() {
    console.log(Object.entries(this.inputs));
  },
};
</script>

<style>
</style>