<!-- Admin shell: drawer with v-model, rail and mobile-breakpoint="lg", app bar, bottom navigation on small screens -->
<script setup lang="ts">
const { lgAndUp } = useDisplay()
const rail = ref(false)
const railOn = computed(() => rail.value && lgAndUp.value)
const drawer = ref(lgAndUp.value)
</script>

<template>
  <v-app class="bg-surface">
    <v-navigation-drawer v-model="drawer" :rail="railOn" rail-width="72" mobile-breakpoint="lg" color="surface" class="border-0">
      <div class="d-flex align-center px-5" style="height: 64px">Logo</div>
      <v-list nav slim>
        <v-list-item title="Dashboard" />
        <v-list-item title="Activities" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="surface" flat height="64">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-spacer />
      <v-btn icon="$account" />
    </v-app-bar>
    <v-bottom-navigation v-if="!lgAndUp" grow>
      <v-btn>One</v-btn>
      <v-btn>Two</v-btn>
    </v-bottom-navigation>
    <v-main class="mx-1 mb-3">
      <v-container class="bg-background pa-3 rounded-lg" fluid>
        <h1 id="probe">Content</h1>
      </v-container>
    </v-main>
  </v-app>
</template>
