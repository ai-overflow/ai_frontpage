<template>
  <v-alert
    text
    dense
    color="indigo"
    icon="mdi-information-outline"
    border="left"
    v-if="all"
  >
    <span v-if="first">
      Sie müssen eine valide Eingabe einfügen um fortfahren zu können.<br />
      Bitte besuchen Sie die
      <a href="https://ai-overflow.github.io/yaml-documentation" target="_blank"
        >Dokumentation</a
      >
      für weitere Informationen.
    </span>
    <span v-if="second">
      Sie müssen die Verbindung
      <code>{{ yamlData ? yamlData.entryPoint : "ERROR" }}</code>
      abschicken um fortfahren zu können.
    </span>
  </v-alert>
</template>

<script>
export default {
  props: {
    validationResult: Object,
    connectionData: Array,
    description: String,
    currentStep: Number,
    yamlData: Object,
  },
  computed: {
    first: function () {
      return (
        (!this.validationResult ||
          !this.validationResult.valid ||
          this.description.length == 0) &&
        this.currentStep == 1
      );
    },
    second: function () {
      return !this.connectionData && this.currentStep == 2;
    },
    all: function () {
      return this.first || this.second;
    },
  },
};
</script>

<style>
</style>