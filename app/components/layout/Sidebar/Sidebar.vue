<script setup>
import SidebarItem from './SidebarItem.vue'
import styles from './Sidebar.module.css'

const props = defineProps({
  activeItem: {
    type: String,
    default: 'ssh'
  }
})

const emit = defineEmits(['item-click', 'more-click'])

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
  emit('item-click', item)
}

const handleMoreClick = (item) => {
  console.log('Clicked more for item:', item)
  emit('more-click', item)
}
</script>

<template>
  <aside :class="styles.sidebar">
    <div :class="styles.sidebar__container">
      <div :class="styles.sidebar__border"/>
      <SidebarItem
        v-for="item in menuItems"
        :key="item.id"
        :icon="item.icon"
        :is-active="props.activeItem === item.id"
        :more-icon="item.moreIcon"
        :more-text="item.moreText"
        :text="item.text"
        @click="handleItemClick(item)"
        @more-click="handleMoreClick(item)"
      />
    </div>
  </aside>
</template>