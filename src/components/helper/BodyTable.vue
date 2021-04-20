<template>
  <v-simple-table v-if="value.type === 'form-data'">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Wert</th>
          <th class="text-left">Content-Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="[k, v] of Object.entries(value.input)" :key="k">
          <td>{{ v.type }}</td>
          <td><var-text :value="v.value" :input-vars="inputVars" /></td>
          <td>{{ v.contentType }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import VarText from "@/components/helper/VarText";

export default {
  props: {
    value: Object,
    inputVars: Object,
  },
  components: {
    VarText,
  },
};
</script>

<style>
</style>