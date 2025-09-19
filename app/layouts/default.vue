<script setup>
import Header from "~/components/layout/Header/Header.vue";
import Footer from "~/components/layout/Footer/Footer.vue";
import styles from './default.module.css'
</script>

<template>
  <div :class="styles.layout">
    <div :class="styles.layout__wrapper">
      <Header/>
      <main :class="styles.layout__main">
        <slot/>
      </main>
      <Footer/>
    </div>
  </div>
</template>
