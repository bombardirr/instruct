<template>
  <div :class="styles.manual">
    <div :class="styles.manual__wrapper">
      <!-- Заголовок с табами -->
      <div :class="styles.header">
        <div :class="styles.header__content">
          <h1 :class="styles.header__title">{{ config.title }}</h1>
          <p :class="styles.header__subtitle">{{ config.subtitle }}</p>
        </div>

        <!-- Настройки пользователя -->
        <div :class="styles.header__settings">
          <div :class="styles.header__settings_disclaimer">
            <p>
              <span>Чтобы финальный код подстроить под вас </span>
              <span :class="styles.settings__smiley" data-smiley="(◕‿◕)">(◕‿◕)</span>
            </p>
          </div>
          <div :class="styles.header__settings_items">
            <div
                v-for="setting in config.settings"
                :key="setting.id"
                :class="styles.header__settings_item"
            >
              <input
                  :id="setting.id"
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
            :step="step"
            :active-tab="activeTab"
            :settings-data="settingsData"
            :is-animating="isAnimating"
            :animated-text="animatedText"
            :current-command="currentCommand"
            @copy-command="copyCommand"
            @button-action="handleButtonAction"
        />
      </div>

      <!-- Дополнительная информация -->
      <div :class="styles.footer">
        <button
            :class="styles.footer__toggle"
            @click="toggleDetails"
        >
          <Icon :name="showDetails ? 'material-symbols:expand-less' : 'material-symbols:expand-more'"/>
          {{ showDetails ? 'СКРЫТЬ' : 'ПОКАЗАТЬ' }} ДОПОЛНИТЕЛЬНО
        </button>

        <div v-if="showDetails" :class="styles.footer__advanced">
          <h4>ДОПОЛНИТЕЛЬНЫЕ КОМАНДЫ</h4>
          <div :class="styles.footer__advanced__list">
            <div
                v-for="cmd in config.advancedCommands"
                :key="cmd.command"
                :class="styles.footer__advanced__item"
            >
              <code>{{ cmd.command }}</code>
              <span>{{ cmd.description }}</span>
            </div>
          </div>
        </div>
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
  }
})

const showDetails = ref(false)
const activeTab = ref(props.config.activeTab || props.config.tabs[0]?.id)

// Реактивные данные настроек
const settingsData = ref({})
props.config.settings.forEach(setting => {
  settingsData.value[setting.id] = setting.defaultValue || ''
})

// Обновляем activeTab при изменении конфигурации
watch(() => props.config, (newConfig) => {
  activeTab.value = newConfig.activeTab || newConfig.tabs[0]?.id
  // Обновляем настройки
  settingsData.value = {}
  newConfig.settings.forEach(setting => {
    settingsData.value[setting.id] = setting.defaultValue || ''
  })
}, {immediate: true})

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

const getDisplayText = (command) => {
  if (isAnimating.value && currentCommand.value === command) {
    return animatedText.value
  }
  return command
}


const handleButtonAction = (action) => {
  if (action === 'openGogs') {
    window.open('https://git.rosatomtech.ru/', '_blank')
  } else if (action === 'openPreprod') {
    window.open('https://booster.rosatomtech.ru/', '_blank')
  }
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<style>
/* CSS модуль импортируется в script setup */
</style>
