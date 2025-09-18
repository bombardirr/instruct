<script setup>
import Sidebar from "~/components/layout/Sidebar/Sidebar.vue";
import Description from "~/components/features/Description/Description.vue";
import IDE from "~/components/features/IDE/IDE.vue";

const activeComponent = ref('ssh')

const handleSidebarClick = (item) => {
  console.log('Clicked item:', item)
  if (item.id === 'ssh') {
    activeComponent.value = 'ssh'
  } else if (item.id === 'ide') {
    activeComponent.value = 'ide'
  }
}

const handleMoreClick = (item) => {
  console.log('Clicked more for item:', item)
  if (item.moreText === 'GIT') {
    activeComponent.value = 'ssh'
  } else if (item.moreText === 'REMOTE') {
    activeComponent.value = 'ide'
  }
}
</script>

<template>
  <div class="home-container">
    <Sidebar :active-item="activeComponent" @item-click="handleSidebarClick" @more-click="handleMoreClick"/>
    <div class="home-container__content">
      <Description v-if="activeComponent === 'ssh'"/>
      <IDE v-if="activeComponent === 'ide'"/>
    </div>
  </div>
</template>

<style>
.home-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  flex: 1;
  background-color: var(--ag-black-primary);
  clip-path: polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px);
  height: -webkit-fill-available;

  .home-container__content {
    width: 100%;
    height: 100%;
    margin-left: 300px;
    background-color: var(--ag-black-secondary);
  }
}
</style>
