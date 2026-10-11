<!-- Rail drawer, e.g. restored from a cookie -->
<template>
  <v-app>
    <v-navigation-drawer permanent rail rail-width="72">
      <v-list nav><v-list-item prepend-icon="$info" title="Inbox" /></v-list>
    </v-navigation-drawer>
    <v-app-bar title="App bar" color="primary" />
    <v-main>
      <v-container><h1 id="probe">Content</h1></v-container>
    </v-main>
  </v-app>
</template>
