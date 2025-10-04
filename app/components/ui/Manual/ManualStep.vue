<template>
  <div :class="[styles.step, styles.scrollable]">
    <div :class="styles.step__header">
      <div :class="styles.step__number" :data-number="step.number">{{ step.number }}</div>
      <h3 :class="styles.step__title">{{ step.title }}</h3>
    </div>
    <div :class="styles.step__body">
      <!-- Команда -->
      <div v-if="step.type === 'command'" :class="styles.command">
        <div :class="styles.command__header">
          <div :class="styles.command__buttons">
            <div>
              <Icon name="line-md:menu-to-close-transition"/>
            </div>
            <div>
              <Icon name="line-md:cog-loop"/>
            </div>
            <div>
              <Icon name="line-md:minus"/>
            </div>
          </div>
          <button
              :class="[styles.button, styles['button--copy']]"
              @click="copyCommand(getCommandText())"
          >
            <Icon name="material-symbols:content-copy"/>
          </button>
        </div>
        <div :class="styles.command__code">
          <code>{{ getDisplayText(reactiveCommandText) }}</code>
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

      <!-- Информационный блок -->
      <div v-else-if="step.type === 'info'" :class="styles.info">
        <div :class="styles.info__content">
          <div :class="styles.instructions">
            <p v-for="(instruction, index) in step.instructions" :key="index">
              {{ instruction }}
            </p>
          </div>
        </div>
      </div>

      <!-- Инструкции -->
      <div v-if="reactiveInstructions.length > 0" :class="styles.instructions">
        <div v-for="(instruction, index) in reactiveInstructions" :key="index">
          <template v-if="typeof instruction === 'object'">
            <p>{{ instruction.text }}<code :class="styles.code">{{ instruction.code }}</code></p>
          </template>
          <template v-else>
            <p>{{ instruction }}</p>
          </template>
        </div>
      </div>

      <!-- Конфиг -->
      <div v-if="step.config && step.config.length > 0" :class="[styles.config, styles.scrollable]">
        <div :class="styles.config__header">
            <div :class="styles.config__title">{{ step.configName || 'Конфиг' }}</div>
          <button
              :class="[styles.button, styles['button--copy']]"
              @click="copyConfig(step.config.join('\n'))"
          >
            <Icon name="material-symbols:content-copy"/>
          </button>
        </div>
        <pre><code>{{ reactiveConfig }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import styles from './ManualStep.module.css'

const props = defineProps({
  step: {
    type: Object,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  },
  settingsData: {
    type: Object,
    required: true
  },
  isAnimating: {
    type: Boolean,
    default: false
  },
  animatedText: {
    type: String,
    default: ''
  },
  currentCommand: {
    type: String,
    default: ''
  }
})

console.log('ШАГ', props.step)

const emit = defineEmits(['copy-command', 'button-action'])

const getInstructions = () => {
  // Проверяем, есть ли альтернативные инструкции для активной вкладки
  if (props.step.alternativeInstructions && props.step.alternativeInstructions[props.activeTab]) {
    // Разбиваем многострочные инструкции на массив и применяем подстановку переменных
    const instructions = props.step.alternativeInstructions[props.activeTab].split('\n').filter(line => line.trim())
    return instructions.map(instruction => replaceVariables(instruction))
  }
  
  return (props.step.instructions || []).map(instruction => replaceVariables(instruction))
}

// Реактивные инструкции для автоматического обновления
const reactiveInstructions = computed(() => {
  return getInstructions()
})

// Реактивный конфиг для автоматического обновления
const reactiveConfig = computed(() => {
  if (props.step.config && props.step.config.length > 0) {
    return replaceVariables(props.step.config.join('\n'))
  }
  return ''
})

const replaceVariables = (text) => {
  if (!text || !props.settingsData) return text
  
  // Заменяем переменные вида {{variableName}} на значения из настроек
  return text.replace(/\{\{(\w+)\}\}/g, (match, variableName) => {
    // Автоматическая генерация пути к ключу на основе активной вкладки
    if (variableName === 'keyPath') {
      const keyName = props.settingsData.keyName || 'id_rsa_tar'
      if (props.activeTab === 'linux') {
        return `~/.ssh/${keyName}`
      } else if (props.activeTab === 'windows') {
        const username = props.settingsData.username || 'user'
        return `C:\\Users\\${username}\\.ssh\\${keyName}`
      }
    }
    
    // Генерация переменных пути для Windows
    if (variableName === 'userProfile') {
      if (props.activeTab === 'linux') {
        return '~'  // Linux эквивалент домашней директории
      } else if (props.activeTab === 'windows') {
        const username = props.settingsData.username || 'user'
        return `C:\\Users\\${username}`
      }
    }
    
    // Замена %USERPROFILE% на правильный путь для Windows
    if (variableName === 'USERPROFILE') {
      if (props.activeTab === 'linux') {
        return '~'  // Linux эквивалент
      } else if (props.activeTab === 'windows') {
        const username = props.settingsData.windowsUsername || 'user'
        return `C:\\Users\\${username}`
      }
    }
    
    const value = props.settingsData[variableName]
    return value !== undefined ? value : match
  })
}

const getCommandText = () => {
  if (typeof props.step.command === 'function') {
    return props.step.command(props.activeTab, props.settingsData)
  }
  
  console.log('Step:', props.step.title, 'Active tab:', props.activeTab, 'Command:', props.step.command, 'Alternative commands:', props.step.alternativeCommands)
  
  // Проверяем, есть ли альтернативная команда для активной вкладки
  let commandText = ''
  if (props.step.alternativeCommands && props.step.alternativeCommands[props.activeTab]) {
    commandText = props.step.alternativeCommands[props.activeTab]
  } else {
    commandText = props.step.command || ''
  }
  
  return replaceVariables(commandText)
}

// Реактивная команда для автоматического обновления при изменении настроек
const reactiveCommandText = computed(() => {
  return getCommandText()
})

const getConfigContent = () => {
  if (typeof props.step.configContent === 'function') {
    return props.step.configContent(props.activeTab, props.settingsData)
  }
  return replaceVariables(props.step.configContent)
}

const getDisplayText = (command) => {
  if (props.isAnimating && props.currentCommand === command) {
    return props.animatedText
  }
  return command
}

const copyCommand = (command) => {
  emit('copy-command', command)
}

const copyConfig = (config) => {
  // Простое копирование без анимации и логирования
  const configWithVariables = replaceVariables(config)
  navigator.clipboard.writeText(configWithVariables).then(() => {
    console.log('Конфиг скопирован в буфер обмена')
  }).catch(err => {
    console.error('Ошибка копирования:', err)
  })
}

const handleButtonAction = (action) => {
  emit('button-action', action)
}
</script>

<style>
/* CSS модуль импортируется в script setup */
</style>
