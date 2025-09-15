<script setup>
import { useNuxtApp } from "#app";

const props = defineProps({
  str: {
    type: String,
    default:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto blanditiis culpa debitis deserunt ex fuga molestias numquam odio suscipit voluptates.",
  },
});
const ready = ref(false);
const stringRef = ref(null);

const { $gsap } = useNuxtApp();

onMounted(() => {
  ready.value = true;
  // Устанавливаем начальную ширину контейнера
  stringRef.value.style.width = "100%";
  stringRef.value.style.wordWrap = "break-word";

  // Анимация печати текста
  $gsap.to(stringRef.value, {
    text: {
      value: props.str,
      delimiter: "",
    },
    duration: 8,
    ease: "none",
  });
});
</script>

<template>
  <div class="console">
    <div ref="stringRef" />
    <span class="cursor">_</span>
  </div>
</template>

<style>
@import "tailwindcss";

.console {
  @apply absolute bottom-2 left-16;
  @apply w-[40%] max-w-[500px] aspect-video;
  @apply p-4;
  @apply font-mono;
  @apply text-green-500;
  @apply bg-black;
  @apply rounded-2xl;

  div {
    @apply w-full;
    @apply whitespace-pre-wrap;
    @apply break-words;
    @apply inline;
  }

  .cursor {
    @apply text-green-500;
    @apply font-mono;
    @apply text-lg;
    @apply font-bold;
    @apply inline;
    @apply animate-pulse;
  }
}
</style>
