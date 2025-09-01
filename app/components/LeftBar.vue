<script setup>
</script>

<template>
  <aside class="left-bar">
    <div class="icn">
      <Icon name="catppuccin:html"/>
    </div>
    <div class="icn">
      <Icon name="catppuccin:database"/>
    </div>
    <div class="icn">
      <Icon name="catppuccin:folder-github"/>
    </div>
  </aside>
</template>

<style>
@import "tailwindcss";

.left-bar {
  @apply flex flex-col justify-start items-center gap-2;
  @apply w-8 h-full;
  @apply pt-2;
  @apply bg-gray-800;

  .icn {
    @apply flex justify-center items-center;
    @apply w-10 h-10;
    @apply border-2 border-gray-600 rounded-full;
    @apply bg-gray-600;
    @apply p-1 -mr-8;
    @apply cursor-pointer;
    @apply transition-all duration-300;

    .iconify {
      @apply w-full h-full;
    }
  }

  .icn:hover {
    @apply bg-gray-800;
    @apply border-gray-800;
  }
}
</style>