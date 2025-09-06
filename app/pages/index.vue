<script setup>
import AgConsole from "~/components/ag-console.vue";
</script>

<template>
  <div class="container">
    <div>Hello</div>
    <AgConsole />
  </div>
</template>

<style>
@import "tailwindcss";

.container {
  @apply relative;
  @apply flex flex-col items-center justify-center;
  @apply h-full;
}
</style>
