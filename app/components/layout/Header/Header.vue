<template>
  <header :class="styles.header">
    <div :class="styles.header__item">Linux/Mac</div>
    <div :class="styles.header__item">Windows</div>
  </header>
</template>

<script setup>
import styles from './Header.module.css'
</script>