<!-- Nuxt delayed hydration: a static header that never hydrates -->
<template>
  <v-app>
    <LazyPlainBar hydrate-never />
    <v-main>
      <v-container><h1 id="probe">Content</h1></v-container>
    </v-main>
  </v-app>
</template>
