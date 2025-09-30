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
          <code>{{ getDisplayText(getCommandText()) }}</code>
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
        <div v-if="step.configContent" :class="[styles.config, styles.scrollable]">
          <pre><code>{{ getConfigContent() }}</code></pre>
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

const emit = defineEmits(['copy-command', 'button-action'])

const getCommandText = () => {
  if (typeof props.step.command === 'function') {
    return props.step.command(props.activeTab, props.settingsData)
  }
  return props.step.command
}

const getConfigContent = () => {
  if (typeof props.step.configContent === 'function') {
    return props.step.configContent(props.activeTab, props.settingsData)
  }
  return props.step.configContent
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

const handleButtonAction = (action) => {
  emit('button-action', action)
}
</script>

<style>
/* CSS модуль импортируется в script setup */
</style>
