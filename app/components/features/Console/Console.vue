<script setup>
import { useNuxtApp } from "#app";
import styles from './Console.module.css'

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
  <div :class="styles.console">
    <div :class="styles.console__text" ref="stringRef" />
    <span :class="styles.console__cursor">_</span>
  </div>
</template>
