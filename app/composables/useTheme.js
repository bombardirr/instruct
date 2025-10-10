export const useTheme = () => {
  // Глобальное состояние темы с гарантией не-null значения
  const globalTheme = useState('theme', () => 'dark')
  
  // Вспомогательная функция для получения текущей темы
  const getCurrentTheme = () => {
    return globalTheme.value || 'dark'
  }
  
  // Инициализация темы из localStorage или дефолтная темная тема
  const initTheme = () => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme')
      
      globalTheme.value = savedTheme || 'dark'
      applyTheme(globalTheme.value)
    }
  }
  
  // Применение темы к документу
  const applyTheme = (newTheme) => {
    if (import.meta.client) {
      const html = document.documentElement
      
      // Убираем все классы тем
      html.classList.remove('dark', 'light')
      
      // Добавляем нужный класс
      html.classList.add(newTheme)
      
      localStorage.setItem('theme', newTheme)
    }
  }
  
  // Переключение темы по циклу: dark -> light -> dark
  const toggleTheme = () => {
    const currentTheme = getCurrentTheme()
    const themeCycle = ['dark', 'light']
    const currentIndex = themeCycle.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themeCycle.length
    const newTheme = themeCycle[nextIndex]
    
    globalTheme.value = newTheme
    applyTheme(newTheme)
  }
  
  // Реактивные свойства для проверки текущей темы
  const isDark = computed(() => getCurrentTheme() === 'dark')
  const isLight = computed(() => getCurrentTheme() === 'light')
  
  // Получение названия темы для отображения
  const themeName = computed(() => {
    const currentTheme = getCurrentTheme()
    switch (currentTheme) {
      case 'dark': return 'DARK'
      case 'light': return 'LIGHT'
      default: return 'DARK'
    }
  })
  
  // Получение следующей темы для подсказки
  const nextThemeName = computed(() => {
    const currentTheme = getCurrentTheme()
    const themeCycle = ['dark', 'light']
    const currentIndex = themeCycle.indexOf(currentTheme)
    const nextIndex = (currentIndex + 1) % themeCycle.length
    const nextTheme = themeCycle[nextIndex]
    
    switch (nextTheme) {
      case 'dark': return 'DARK'
      case 'light': return 'LIGHT'
      default: return 'DARK'
    }
  })
  
  return {
    theme: readonly(globalTheme),
    isDark,
    isLight,
    themeName,
    nextThemeName,
    toggleTheme,
    initTheme
  }
}
