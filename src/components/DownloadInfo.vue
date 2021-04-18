<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Calories
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="[key, value] in Object.entries(info)"
          :key="key"
        >
          <td>{{ key }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    info: Object,
  },
  data() {
    return {
      data: [{ a: "a", b: "b" }],
    };
  },
};
</script>

<style>
</style>