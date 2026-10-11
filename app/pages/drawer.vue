<!-- #18291 / the docs' default application layout: drawer without v-model, app bar, main -->
<template>
  <v-app>
    <v-navigation-drawer>
      <v-list nav>
        <v-list-item title="Inbox" />
        <v-list-item title="A long item title that would stretch a content sized drawer" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar title="App bar" color="primary" />
    <v-main>
      <v-container>
        <h1 id="probe">Content</h1>
      </v-container>
    </v-main>
  </v-app>
</template>
