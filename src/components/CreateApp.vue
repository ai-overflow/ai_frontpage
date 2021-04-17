<template>
  <div>
      Git-URL:
      <v-text-field
        lab
        v-model="gitURL"
        />
        <button
        @click="downloadGit">
            erstellen
        </button>
        <AppList />
  </div>
</template>

<script>
import GitService from '@/services/GitService'
import AppList from '@/components/AppList'

export default {
    data() {
        return {
            gitURL: ''
        }
    },
    components: {
        AppList
    },
    methods: {
        downloadGit() {
            console.log('Downloading: ', this.gitURL);
            GitService.createProject(this.gitURL);
            
        }
    }
}
</script>

<style>

</style>