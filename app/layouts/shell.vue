<!-- The usual Nuxt structure: the layout owns the shell, the page renders inside v-main -->
<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list nav><v-list-item title="Inbox" /></v-list>
    </v-navigation-drawer>
    <v-app-bar title="Layout app bar" color="primary" />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
