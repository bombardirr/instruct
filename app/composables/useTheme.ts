export const useTheme = () => {
  // Глобальное состояние темы
  const globalTheme = useState('theme', () => 'dark')
  
  // Инициализация темы из localStorage или дефолтная темная тема
  const initTheme = () => {
    if (process.client) {
      const savedTheme = localStorage.getItem('theme')
      
      console.log('Initializing theme:', { savedTheme, defaultTheme: 'dark' })
      globalTheme.value = savedTheme || 'dark'
      applyTheme(globalTheme.value)
    }
  }
  
  // Применение темы к документу
  const applyTheme = (newTheme) => {
    if (process.client) {
      const html = document.documentElement
      console.log('Applying theme:', newTheme)
      
      // Убираем все классы тем
      html.classList.remove('dark', 'light', 'dim')
      
      // Добавляем нужный класс
      html.classList.add(newTheme)
      
      localStorage.setItem('theme', newTheme)
      console.log('HTML classes after theme change:', html.className)
    }
  }
  
  // Переключение темы по циклу: dark -> dim -> light -> dark
  const toggleTheme = () => {
    const themeCycle = ['dark', 'dim', 'light']
    const currentIndex = themeCycle.indexOf(globalTheme.value)
    const nextIndex = (currentIndex + 1) % themeCycle.length
    const newTheme = themeCycle[nextIndex]
    
    console.log('Toggling theme from', globalTheme.value, 'to', newTheme)
    globalTheme.value = newTheme
    applyTheme(newTheme)
  }
  
  // Установка конкретной темы
  const setTheme = (newTheme) => {
    if (['dark', 'light', 'dim'].includes(newTheme)) {
      globalTheme.value = newTheme
      applyTheme(newTheme)
    }
  }
  
  // Реактивные свойства для проверки текущей темы
  const isDark = computed(() => globalTheme.value === 'dark')
  const isLight = computed(() => globalTheme.value === 'light')
  const isDim = computed(() => globalTheme.value === 'dim')
  
  // Получение названия темы для отображения
  const themeName = computed(() => {
    switch (globalTheme.value) {
      case 'dark': return 'DARK'
      case 'light': return 'LIGHT'
      case 'dim': return 'DIMMED'
      default: return 'DARK'
    }
  })
  
  // Получение следующей темы для подсказки
  const nextThemeName = computed(() => {
    const themeCycle = ['dark', 'dim', 'light']
    const currentIndex = themeCycle.indexOf(globalTheme.value)
    const nextIndex = (currentIndex + 1) % themeCycle.length
    const nextTheme = themeCycle[nextIndex]
    
    switch (nextTheme) {
      case 'dark': return 'DARK'
      case 'light': return 'LIGHT'
      case 'dim': return 'DIMMED'
      default: return 'DARK'
    }
  })
  
  return {
    theme: readonly(globalTheme),
    isDark,
    isLight,
    isDim,
    themeName,
    nextThemeName,
    toggleTheme,
    setTheme,
    initTheme
  }
}
