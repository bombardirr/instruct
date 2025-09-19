<script setup>
import Sidebar from "~/components/layout/Sidebar/Sidebar.vue";
import Manual from "~/components/ui/Manual/Manual.vue";
import { sshConfig } from "~/components/ui/Manual/sshConfig.js";
import { ideConfig } from "~/components/ui/Manual/ideConfig.js";
import styles from './index.module.css'

const activeComponent = ref('ssh')

// Конфигурации мануалов
const manualConfigs = {
  ssh: sshConfig,
  ide: ideConfig
}

// Текущая конфигурация
const currentConfig = computed(() => manualConfigs[activeComponent.value])

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
  <div :class="styles.home">
    <Sidebar :active-item="activeComponent" @item-click="handleSidebarClick" @more-click="handleMoreClick"/>
    <div :class="styles.home__content">
      <Manual :config="currentConfig"/>
    </div>
  </div>
</template>
