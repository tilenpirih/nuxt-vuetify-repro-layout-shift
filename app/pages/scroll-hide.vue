<template>
  <v-app>
    <v-app-bar title="Hides on scroll" color="primary" scroll-behavior="hide elevate">
      <template #extension><div class="px-4">Extension</div></template>
    </v-app-bar>
    <v-main>
      <v-container><h1 id="probe">Content</h1><div style="height: 3000px" /></v-container>
    </v-main>
  </v-app>
</template>
