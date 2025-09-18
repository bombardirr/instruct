<script setup>
import SidebarItem from './SidebarItem.vue'

const isMenuItemClicked = ref(false)

const menuItems = [
  {
    id: 'ssh',
    icon: 'material-icon-theme:cds',
    text: 'SSH',
    moreText: 'GIT',
    moreIcon: 'line-md:uploading-loop'
  },
  {
    id: 'ide',
    icon: 'material-icon-theme:purescript',
    text: 'IDE',
    moreText: 'REMOTE',
    moreIcon: 'line-md:uploading-loop'
  }
]

const handleItemClick = (item) => {
  console.log('Clicked item:', item)
  // Здесь можно добавить логику обработки клика
}

const handleMoreClick = (item) => {
  console.log('Clicked more for item:', item)
  // Здесь можно добавить логику обработки клика на дополнительную опцию
}
</script>

<template>
  <aside class="left-bar">
    <div class="left-bar__container">
      <div class="left-bar__borderA"/>
      <SidebarItem
        v-for="item in menuItems"
        :key="item.id"
        :icon="item.icon"
        :text="item.text"
        :more-text="item.moreText"
        :more-icon="item.moreIcon"
        :is-active="isMenuItemClicked"
        @click="handleItemClick(item)"
        @more-click="handleMoreClick(item)"
      />
    </div>
  </aside>
</template>

<style>
@import "tailwindcss";

.left-bar {
  @apply absolute;
  @apply w-fit max-w-[300px] h-full;

  .left-bar__container {
    @apply relative;
    @apply flex flex-col justify-start items-start gap-2;
    @apply w-fit h-full;
    @apply pl-12 pt-2;

    .left-bar__borderA {
      @apply absolute top-0 left-0;
      @apply w-8 h-full;
      @apply bg-[var(--ag-gray-primary)];
    }
  }
}
</style>