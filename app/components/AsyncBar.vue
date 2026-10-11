<!-- An app bar inside a component with async setup, e.g. a header that awaits useFetch for its menu -->
<script setup lang="ts">
await new Promise(resolve => setTimeout(resolve, 20))
</script>

<template>
  <v-app-bar title="Async header" color="primary" />
</template>
