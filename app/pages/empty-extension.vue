<!-- Extension slot whose content is switched off -->
<script setup lang="ts">
const tabs = ref(false)
</script>

<template>
  <v-app>
    <v-app-bar title="App bar" color="primary">
      <template #extension>
        <v-tabs v-if="tabs"><v-tab>One</v-tab></v-tabs>
      </template>
    </v-app-bar>
    <v-main>
      <v-container><h1 id="probe">Content</h1></v-container>
    </v-main>
  </v-app>
</template>
