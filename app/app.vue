<template>
  <NuxtLayout>
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup>
// Применяем тему сразу при загрузке страницы
if (import.meta.client) {
  const savedTheme = localStorage.getItem('theme') || 'dark'
  document.documentElement.classList.add(savedTheme)
}
</script>