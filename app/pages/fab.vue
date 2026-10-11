<!-- App FABs: default size, small, and one that reserves layout space -->
<template>
  <v-app>
    <v-app-bar title="App bar" color="primary" />
    <v-main>
      <v-container><h1 id="probe">Content</h1></v-container>
    </v-main>
    <v-fab app icon="$plus" location="bottom end" color="primary" />
    <v-fab app icon="$minus" location="bottom start" size="small" color="secondary" />
    <v-fab app layout icon="$edit" location="top end" color="error" />
  </v-app>
</template>
