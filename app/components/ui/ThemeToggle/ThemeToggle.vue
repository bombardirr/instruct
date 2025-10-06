<template>
  <div :class="styles.themeToggleContainer">
    <button
      @click="handleToggle"
      :class="styles.themeToggle"
      :title="`Переключить на ${nextThemeName}`"
    >
      <Icon 
        name="material-symbols:sunny" 
        :class="styles.themeToggle__sunIcon"
      />
    </button>
  </div>
</template>

<script setup>
import styles from './ThemeToggle.module.css'

const { isDark, isLight, isDim, themeName, nextThemeName, toggleTheme } = useTheme()

const handleToggle = () => {
  console.log('Theme toggle clicked, current theme:', themeName.value)
  toggleTheme()
  console.log('Theme after toggle:', themeName.value)
}
</script>
