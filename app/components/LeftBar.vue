<script setup>
</script>

<template>
  <aside class="left-bar">
    <div class="left-bar__borderA"/>
    <div class="left-bar__item">
      <div class="icn">
        <Icon name="material-icon-theme:cds"/>
      </div>
      <span class="text">SSH</span>
      <div class="icn-more">
        <Icon name="line-md:uploading-loop"/>
      </div>
      <span class="text">GIT</span>
    </div>
    <div class="left-bar__item">
      <div class="icn">
        <Icon name="material-icon-theme:purescript"/>
      </div>
      <span class="text">IDE</span>
      <div class="icn-more">
        <Icon name="line-md:uploading-loop"/>
      </div>
      <span class="text">REMOTE</span>
    </div>
  </aside>
</template>

<style>
@import "tailwindcss";

.left-bar {
  @apply relative;
  @apply flex flex-col justify-start items-start gap-2;
  @apply w-fit max-w-[300px] h-full;
  @apply pt-2 pl-12;

  .left-bar__borderA {
    @apply absolute top-0 left-0 -z-1;
    @apply w-8 h-full;
    @apply bg-[var(--ag-gray-primary)];
  }

  .left-bar__item {
    @apply flex justify-start items-center gap-2;
    @apply cursor-pointer;
    @apply transition-all duration-300;
    @apply transform translate-x-0;
  }

  .left-bar__item:hover {
    @apply translate-x-2;

    .icn-more {
      @apply flex justify-center items-center;
    }
  }

  .icn {
    @apply flex justify-center items-center;
    @apply w-10 h-10;
    @apply p-1;
    @apply transition-all duration-300;

    .iconify {
      @apply w-full h-full;
    }
  }

  .icn-more {
    @apply hidden;
    @apply w-6 h-6;
    @apply text-amber-50;
    @apply p-1;
    @apply cursor-pointer;
    @apply rotate-90;

    .iconify {
      @apply w-full h-full;
    }
  }

  .text {
    @apply text-amber-100;
  }
}
</style>