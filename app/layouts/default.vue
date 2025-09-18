<script setup>
import Header from "~/components/layout/Header/Header.vue";
import Footer from "~/components/layout/Footer/Footer.vue";
</script>

<template>
  <div class="default-layout">
    <div class="default-layout__wrapper">
    <Header/>
    <main>
      <slot/>
    </main>
    <Footer/>
    </div>
  </div>
</template>

<style>
.default-layout {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--ag-black-primary);

  .default-layout__wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 1920px;
    min-height: 100vh;
    margin: 0 auto;

    main {
      position: relative;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
      background-color: var(--ag-black-primary);
    }
  }
}
</style>
