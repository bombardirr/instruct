<script setup>
import Sidebar from "~/components/layout/Sidebar/Sidebar.vue";
import Description from "~/components/features/Description/Description.vue";
</script>

<template>
  <div class="home-container">
    <Sidebar/>
    <div class="home-container__content">
      <Description/>
    </div>
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
    @apply ml-[300px];
    @apply bg-cyan-900;
  }
}
</style>
