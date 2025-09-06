<script setup>
import AgFooter from "~/components/ag-footer.vue";
import AgHeader from "~/components/ag-header.vue";
// import LeftBar from "~/components/LeftBar.vue";
</script>

<template>
  <div class="default-layout">
    <AgHeader/>
    <main>
<!--      <LeftBar/>-->
      <slot/>
    </main>
    <AgFooter/>
  </div>
</template>

<style>
@import "tailwindcss";

.default-layout {
  @apply flex flex-col justify-between items-center;
  @apply h-full;

  main {
    @apply relative;
    @apply flex justify-start items-center gap-0;
    @apply flex-1;
    @apply w-full;
    @apply bg-gray-500;
  }
}
</style>
