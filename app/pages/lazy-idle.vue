<!-- Nuxt delayed hydration: the header hydrates when the browser is idle -->
<template>
  <v-app>
    <LazyPlainBar hydrate-on-idle />
    <v-main>
      <v-container><h1 id="probe">Content</h1></v-container>
    </v-main>
  </v-app>
</template>
