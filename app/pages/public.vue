<!-- Public site shell: temporary drawer, transparent app bar with a border, main with a footer inside -->
<script setup lang="ts">
const menu = ref(false)
</script>

<template>
  <v-app class="bg-surface">
    <v-navigation-drawer v-model="menu" temporary>
      <v-list nav>
        <v-list-item title="Activities" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat height="64" color="transparent" border="b">
      <v-app-bar-nav-icon @click="menu = !menu" />
      <v-spacer />
      <v-btn>Sign in</v-btn>
    </v-app-bar>
    <v-main class="d-flex flex-column">
      <div class="flex-grow-1 pa-6">
        <h1 id="probe">Content</h1>
      </div>
      <footer class="pa-8">Footer</footer>
    </v-main>
  </v-app>
</template>
