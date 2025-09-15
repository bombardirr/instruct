<script setup>
import AgConsole from "~/components/ag-console.vue";
</script>

<template>
  <div class="home-container">
    <LeftBar/>
    <div class="home-container__content"/>
<!--    <AgConsole />-->
  </div>
</template>

<style>
@import "tailwindcss";

.home-container {
  @apply relative;
  @apply flex justify-between items-center gap-12;
  @apply flex-1;
  @apply bg-[var(--ag-green-primary)];
  @apply [clip-path:polygon(20px_0,_calc(100%_-_20px)_0,_100%_20px,_100%_calc(100%_-_20px),_calc(100%_-_20px)_100%,_20px_100%,_0_calc(100%_-_20px),_0_20px)];
  height: -webkit-fill-available;

  .home-container__content {
    @apply w-full h-full;
    @apply bg-cyan-900;
  }
}
</style>
