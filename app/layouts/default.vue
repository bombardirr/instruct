<script setup>
import Header from "~/components/layout/Header/Header.vue";
import Footer from "~/components/layout/Footer/Footer.vue";
</script>

<template>
  <div class="default-layout">
    <div class="default-layout__wrapper">
    <Header/>
    <main>
      <slot/>
    </main>
    <Footer/>
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
