<template>
  <div class="console">Console</div>
</template>

<style>
@import 'tailwindcss';

.console {
  @apply absolute bottom-2 left-2;
  @apply w-[40%] max-w-[500px] aspect-video;
  @apply p-4;
  @apply bg-black;
  @apply text-green-500;
  @apply rounded-2xl;
}
</style>