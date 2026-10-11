<!-- Nuxt delayed hydration: the app footer hydrates when it becomes visible -->
<template>
  <v-app>
    <v-app-bar title="App bar" color="primary" />
    <LazyPlainFooter hydrate-on-visible />
    <v-main>
      <v-container><h1 id="probe">Content</h1></v-container>
    </v-main>
  </v-app>
</template>
