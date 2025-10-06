export default defineNuxtPlugin(() => {
  // Применяем тему сразу при загрузке плагина
  const savedTheme = localStorage.getItem('theme') || 'dark'
  document.documentElement.classList.add(savedTheme)
})
