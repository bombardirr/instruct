<template>
  <div class="container">
    <div>re</div>
    <div>re</div>
    <div>re</div>
  </div>
</template>

<script setup>

</script>

<style>
@import 'tailwindcss';

.container {
  @apply flex flex-col items-center justify-center;

  div:nth-child(1) {
    @apply bg-green-300;
  }
}
</style>