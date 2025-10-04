<template>
  <div :id="`${activeTab}-manual`" :class="styles.manual">
    <div :class="styles.manual__wrapper">
      <!-- Заголовок с табами -->
      <div :class="styles.header">
        <div :class="styles.header__content">
          <h1 :class="styles.header__title">{{ config.title }}</h1>
          <p :class="styles.header__subtitle">{{ config.subtitle }}</p>
        </div>

        <!-- Настройки пользователя -->
        <div v-if="shouldShowSettings" :class="styles.header__settings">
          <div :class="styles.header__settings_disclaimer">
            <p>
              <span>Чтобы финальный код подстроить под вас </span>
              <span :class="styles.settings__smiley" data-smiley="(◕‿◕)">(◕‿◕)</span>
            </p>
          </div>
          <div :class="styles.header__settings_items">
            <div
                v-for="setting in visibleSettings"
                :key="setting.id"
                :class="styles.header__settings_item"
            >
              <label :for="`${config.id}-${setting.id}`">{{ setting.label }}</label>
              <input
                  :id="`${config.id}-${setting.id}`"
                  v-model="settingsData[setting.id]"
                  :autocomplete="setting.autocomplete"
                  :placeholder="setting.placeholder"
                  :type="setting.type"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Контент - шаги -->
      <div :class="styles.content">
        <ManualStep
            v-for="step in config.steps"
            :key="step.number"
            :active-tab="activeTab"
            :animated-text="animatedText"
            :current-command="currentCommand"
            :is-animating="isAnimating"
            :settings-data="settingsData"
            :step="step"
            @copy-command="copyCommand"
            @button-action="handleButtonAction"
        />
      </div>

    </div>
    <div :class="styles.manual__sidebar">
      <!-- Табы -->
      <div :class="styles.tabs__wrapper">
        <div :class="styles.tabs">
          <button
              v-for="tab in config.tabs"
              :key="tab.id"
              :class="[styles.tabs__item, { [styles['tabs__item--active']]: activeTab === tab.id }]"
              @click="setActiveTab(tab.id)"
          >
            <Icon :name="tab.icon"/>
            <!--            {{ tab.label }}-->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import styles from './Manual.module.css'
import ManualStep from './ManualStep.vue'

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  activeSidebarItem: {
    type: String,
    default: 'ssh'
  }
})

console.log('Manual component config:', props.config)
console.log('Steps:', props.config.steps)
console.log('Active sidebar item:', props.activeSidebarItem)

console.log('КОНФИГ', props.config)

// Маппинг между сайдбаром и карточками
const cardMapping = {
  'ssh': 'ssh-setup',           // Настройка SSH
  'ide': 'ide-setup',           // Удаленная разработка
  'git': 'git-workflow',        // Работа с GIT
  'npm': 'npm-package-manager', // Работа с NPM
  'vue': 'vue-development',     // Разработка на Vue
  'deploy': 'deployment'        // Деплой проекта
}

// Определяем должна ли текущая карточка показывать настройки
const shouldShowSettings = computed(() => {
  const expectedCardId = cardMapping[props.activeSidebarItem]
  console.log('Manual shouldShowSettings check:', {
    'activeSidebarItem': props.activeSidebarItem,
    'expectedCardId': expectedCardId,
    'currentCardId': props.config.id,
    'shouldShow': props.config.id === expectedCardId
  })
  
  // ВРЕМЕННО: показываем инпуты для всех карточек для тестирования
  const shouldTestAll = true // Временно установлено в true для тестирования
  
  if (shouldTestAll) {
    return true // Показываем инпуты для всех карточек
  }
  
  return props.config.id === expectedCardId
})

const activeTab = ref(props.config.activeTab || props.config.tabs[0]?.id)

// Реактивные данные настроек
const settingsData = ref({})

// Инициализируем настройки с учетом активной вкладки
const initializeSettings = (config, activeTabValue) => {
  const settings = {}
  config.settings.forEach(setting => {
    // Используем значение для активной вкладки, если есть defaultValueMap, иначе defaultValue
    let defaultValue = setting.defaultValue || ''
    if (setting.defaultValueMap && setting.defaultValueMap[activeTabValue]) {
      defaultValue = setting.defaultValueMap[activeTabValue]
    }
    settings[setting.id] = defaultValue
  })
  settingsData.value = settings
}

// Фильтруем настройки для отображения только подходящих для активной вкладки
// и только если эта карточка активна в сайдбаре
const visibleSettings = computed(() => {
  console.log('visibleSettings computed:', {
    'shouldShowSettings': shouldShowSettings.value,
    'currentTab': activeTab.value,
    'settingsCount': props.config.settings?.length || 0
  })
  
  if (!shouldShowSettings.value) {
    console.log('Settings hidden for card:', props.config.id)
    return []
  }
  
  const filtered = props.config.settings.filter(setting => {
    return !setting.visibleFor || setting.visibleFor.includes(activeTab.value)
  })
  console.log('Settings filtered for', props.config.id, ':', filtered.length, 'items')
  return filtered
})

// Инициализируем настройки при создании компонента (всегда)
initializeSettings(props.config, activeTab.value)

// Обновляем activeTab при изменении конфигурации
watch(() => props.config, (newConfig) => {
  activeTab.value = newConfig.activeTab || newConfig.tabs[0]?.id
  initializeSettings(newConfig, activeTab.value)
}, {immediate: true})

// Обновляем настройки при смене активной вкладки (всегда)
watch(activeTab, (newTabId) => {
  initializeSettings(props.config, newTabId)
})

// Обновляем настройки при смене активной сайдбар карточки (всегда)
watch(() => props.activeSidebarItem, (newSidebarItem) => {
  initializeSettings(props.config, activeTab.value)
})

// Анимация копирования
const isAnimating = ref(false)
const animatedText = ref('')
const currentCommand = ref('')

const setActiveTab = (tabId) => {
  activeTab.value = tabId
}

const copyCommand = async (command) => {
  if (isAnimating.value) return

  try {
    await navigator.clipboard.writeText(command)
    console.log('Command copied:', command)

    // Запускаем анимацию
    await animateCopy(command)
  } catch (err) {
    console.error('Copy error:', err)
  }
}

const animateCopy = async (command) => {
  isAnimating.value = true
  currentCommand.value = command
  animatedText.value = command

  // Стираем текст по символам
  for (let i = command.length; i >= 0; i--) {
    animatedText.value = command.substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 25))
  }

  // Печатаем "Скопировано"
  const copyText = "Скопировано"
  for (let i = 0; i <= copyText.length; i++) {
    animatedText.value = copyText.substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 50))
  }

  // Добавляем смайлик котика
  await new Promise(resolve => setTimeout(resolve, 250))
  animatedText.value = copyText + " ₍^. .^₎⟆"

  // Возвращаем исходный текст
  await new Promise(resolve => setTimeout(resolve, 1000))
  for (let i = copyText.length + 8; i >= 0; i--) {
    animatedText.value = (copyText + " ₍^. .^₎⟆").substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 25))
  }

  // Восстанавливаем исходную команду
  for (let i = 0; i <= command.length; i++) {
    animatedText.value = command.substring(0, i)
    await new Promise(resolve => setTimeout(resolve, 25))
  }

  isAnimating.value = false
}

const handleButtonAction = (action) => {
  if (action === 'openGogs') {
    window.open('https://git.rosatomtech.ru/', '_blank')
  } else if (action === 'openPreprod') {
    window.open('https://booster.rosatomtech.ru/', '_blank')
  }
}

</script>

<style>
/* CSS модуль импортируется в script setup */
</style>
