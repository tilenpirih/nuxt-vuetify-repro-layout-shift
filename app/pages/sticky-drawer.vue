<template>
  <v-app>
    <v-app-bar title="App bar" color="primary" />
    <v-navigation-drawer sticky permanent>
      <v-list nav><v-list-item v-for="n in 40" :key="n" :title="`Item ${n}`" /></v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container><h1 id="probe">Content</h1><div style="height: 3000px" /></v-container>
    </v-main>
  </v-app>
</template>
