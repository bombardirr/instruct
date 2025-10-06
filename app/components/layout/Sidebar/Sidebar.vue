<script setup>
import SidebarItem from './SidebarItem.vue'
import styles from './Sidebar.module.css'

const props = defineProps({
  activeItem: {
    type: String,
    default: 'ssh'
  },
  cards: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['item-click'])

// Маппинг между сайдбаром и карточками
const cardMapping = {
  'ssh': 'ssh-setup',           // Настройка SSH
  'ide': 'ide-setup',           // Удаленная разработка
  'git': 'git-workflow',        // Работа с GIT
  'npm': 'npm-package-manager', // Работа с NPM
  'vue': 'vue-development',     // Разработка на Vue
  'deploy': 'deployment'        // Деплой проекта
}

// Создаем динамический массив menuItems на основе данных карточек
const menuItems = computed(() => {
  return Object.keys(cardMapping).map(sidebarId => {
    const cardId = cardMapping[sidebarId]
    const card = props.cards.find(card => card.id === cardId)
    
    return {
      id: sidebarId,
      icon: card?.menuIcon || card?.icon || 'material-icon-theme:cds',
      text: card?.menuText || card?.menuId || sidebarId.toUpperCase()
    }
  })
})

const handleItemClick = (item) => {
  console.log('Clicked item:', item)
  emit('item-click', item)
}
</script>

<template>
  <aside :class="styles.sidebar">
    <div :class="styles.sidebar__container">
      <div :class="styles.sidebar__wrapper">
        <SidebarItem
            v-for="item in menuItems"
            :key="item.id"
            :icon="item.icon"
            :is-active="props.activeItem === item.id"
            :text="item.text"
            @click="handleItemClick(item)"
        />
      </div>
    </div>
  </aside>
</template>