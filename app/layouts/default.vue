<script setup>
import AgFooter from "~/components/ag-footer.vue";
import AgHeader from "~/components/ag-header.vue";
// import LeftBar from "~/components/LeftBar.vue";
</script>

<template>
  <div class="default-layout">
    <div class="default-layout__wrapper">
    <AgHeader/>
    <main>
<!--      <LeftBar/>-->
      <slot/>
    </main>
    <AgFooter/>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";

.default-layout {
  @apply relative;
  @apply w-full min-h-screen;

  .default-layout__wrapper {
    @apply relative;
    @apply flex flex-col justify-between;
    @apply max-w-[1920px] min-h-screen mx-auto;

    main {
      @apply relative;
      @apply flex-1;
      @apply flex justify-center items-center;
      @apply p-8;
      @apply bg-[var(--ag-green-primary)];
    }
  }
}
</style>
