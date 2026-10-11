<!-- Footer placed after v-main, as in most layouts -->
<template>
  <v-app>
    <v-app-bar title="App bar" color="primary" />
    <v-navigation-drawer permanent>
      <v-list nav><v-list-item title="Inbox" /></v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container><h1 id="probe">Content</h1></v-container>
    </v-main>
    <v-footer app height="48" color="secondary">Footer</v-footer>
  </v-app>
</template>
