<script setup lang="ts">
definePageMeta({ layout: 'shell' })
const { data } = await useAsyncData('greeting', () => new Promise<string>(resolve => setTimeout(() => resolve('Content'), 20)))
</script>

<template>
  <v-container>
    <h1 id="probe">{{ data }}</h1>
  </v-container>
</template>
