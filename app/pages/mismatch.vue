<!-- Positive control: drawer open on the server, closed on the client, must warn -->
<template>
  <v-app>
    <v-app-bar title="App bar" color="primary" />
    <v-navigation-drawer :model-value="isServer" permanent>
      <v-list nav><v-list-item title="Inbox" /></v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container><h1 id="probe">Content</h1></v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const isServer = import.meta.server
</script>
