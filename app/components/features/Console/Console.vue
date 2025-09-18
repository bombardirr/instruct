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
  position: absolute;
  bottom: 0.5rem;
  left: 4rem;
  width: 40%;
  max-width: 500px;
  aspect-ratio: 16/9;
  padding: 1rem;
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
  color: var(--ag-gray-lighter);
  background-color: var(--ag-gray-primary);
  border-radius: 1rem;
  border: 1px solid var(--ag-gray-secondary);

  div {
    width: 100%;
    white-space: pre-wrap;
    word-break: break-words;
    display: inline;
  }

  .cursor {
    color: var(--ag-gray-lighter);
    font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 1.125rem;
    font-weight: bold;
    display: inline;
    animation: pulse 2s infinite;
  }
}
</style>
