<template>
  <div :class="styles.manual">
    <div :class="styles.manual__wrapper">
      <!-- Заголовок с табами -->
      <div :class="styles.header">
        <div :class="styles.header__content">
          <h1 :class="styles.header__title">{{ config.title }}</h1>
          <p :class="styles.header__subtitle">{{ config.subtitle }}</p>
        </div>
      </div>

      <!-- Настройки пользователя -->
      <div :class="styles.settings">
        <div :class="styles.settings__header">
          <h3 :class="styles.settings__title">НАСТРОЙКИ</h3>
          <div :class="styles.settings__disclaimer">
            <p>
              <span>Чтобы финальный код подстроить под вас </span>
              <span :class="styles.settings__smiley" data-smiley="(◕‿◕)">(◕‿◕)</span>
            </p>
          </div>
        </div>
        <div :class="styles.settings__grid">
          <div
              v-for="setting in config.settings"
              :key="setting.id"
              :class="styles.settings__item"
          >
            <label :class="styles.settings__label" :for="setting.id">{{ setting.label }}</label>
            <input
                :id="setting.id"
                v-model="settingsData[setting.id]"
                :autocomplete="setting.autocomplete"
                :class="styles.settings__input"
                :placeholder="setting.placeholder"
                :type="setting.type"
            >
          </div>
        </div>
      </div>

      <!-- Контент - шаги -->
      <div :class="styles.content">
        <div
            v-for="step in config.steps"
            :key="step.number"
            :class="styles.step"
        >
          <div :class="styles.step__header">
            <div :class="styles.step__number" :data-number="step.number">{{ step.number }}</div>
            <h3 :class="styles.step__title">{{ step.title }}</h3>
          </div>
          <div :class="styles.step__body">
            <!-- Команда -->
            <div v-if="step.type === 'command'" :class="styles.command">
              <div :class="styles.command__header">
                <span :class="styles.command__label">{{ step.commandLabel || 'ВЫПОЛНИТЬ' }}</span>
                <button
                    :class="[styles.button, styles['button--copy']]"
                    @click="copyCommand(getCommandText(step))"
                >
                  <Icon name="material-symbols:content-copy"/>
                </button>
              </div>
              <div :class="styles.command__code">
                <code>{{ getDisplayText(getCommandText(step)) }}</code>
              </div>
            </div>

            <!-- Кнопка действия -->
            <button
                v-else-if="step.type === 'button'"
                :class="[styles.button, styles['button--primary']]"
                @click="handleButtonAction(step.buttonAction)"
            >
              <Icon :name="step.buttonIcon"/>
              {{ step.buttonText }}
            </button>

            <!-- Инструкции -->
            <div :class="styles.instructions">
              <p v-for="(instruction, index) in step.instructions" :key="index">
                <template v-if="typeof instruction === 'object'">
                  {{ instruction.text }}<code :class="styles.code">{{ instruction.code }}</code>
                </template>
                <template v-else>
                  {{ instruction }}
                </template>
              </p>

              <!-- Конфигурационный блок -->
              <div v-if="step.configContent" :class="styles.config">
                <pre><code>{{ getConfigContent(step) }}</code></pre>
              </div>

              <!-- Список настроек -->
              <ul v-if="step.configList" :class="styles.config__list">
                <li v-for="(item, index) in step.configList" :key="index">
                  <template v-if="typeof item === 'object'">
                    <code :class="styles.code">{{ item.code }}</code>{{ item.text }}
                  </template>
                  <template v-else>
                    {{ item }}
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </div>
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

const getCommandText = (step) => {
  if (typeof step.command === 'function') {
    return step.command(activeTab.value, settingsData.value)
  }
  return step.command
}

const getConfigContent = (step) => {
  if (typeof step.configContent === 'function') {
    return step.configContent(activeTab.value, settingsData.value)
  }
  return step.configContent
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
