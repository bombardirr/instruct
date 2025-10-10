<template>
  <div :class="styles.themeToggleContainer">
    <button
        :class="styles.themeToggle"
        :title="`Переключить на ${nextThemeName}`"
        @click="handleToggle"
    >
      <Icon
          :class="styles.themeToggle__sunIcon"
          name="material-symbols:sunny"
      />
    </button>
  </div>
</template>

<script setup>
import styles from './ThemeToggle.module.css'

const {nextThemeName, toggleTheme} = useTheme()

const handleToggle = () => {
  toggleTheme()
}
</script>
