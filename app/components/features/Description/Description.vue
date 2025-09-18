<template>
  <div :class="styles.description">
    <!-- Заголовок -->
    <div :class="styles.header">
      <div :class="styles.header__content">
        <h1 :class="styles.header__title">НАСТРОЙКА SSH</h1>
        <p :class="styles.header__subtitle">Безопасный доступ к репозиторию</p>
      </div>
      <div :class="styles.header__accent"/>
    </div>

    <!-- Табы для ОС -->
    <div :class="styles.tabs">
      <button 
        :class="[styles.tabs__item, { [styles['tabs__item--active']]: activeOS === 'linux' }]"
        @click="activeOS = 'linux'"
      >
        <Icon name="simple-icons:linux" />
        LINUX
      </button>
      <button 
        :class="[styles.tabs__item, { [styles['tabs__item--active']]: activeOS === 'windows' }]"
        @click="activeOS = 'windows'"
      >
        <Icon name="simple-icons:windows" />
        WINDOWS
      </button>
    </div>

    <!-- Настройки пользователя -->
    <div :class="styles.settings">
      <div :class="styles.settings__header">
        <h3 :class="styles.settings__title">НАСТРОЙКИ</h3>
        <div :class="styles.settings__disclaimer">
          <p>
            <span>Чтобы финальный код подстроить под вас </span>
            <span :class="styles.smiley" data-smiley="(◕‿◕)">(◕‿◕)</span>
          </p>
        </div>
      </div>
      <div :class="styles.settings__grid">
        <div :class="styles.settings__item">
          <label :class="styles.settings__label" for="username">Имя пользователя (Windows)</label>
          <input 
            id="username"
            v-model="username"
            :class="styles.settings__input"
            placeholder="Ваше имя пользователя"
            type="text"
            autocomplete="username"
          >
        </div>
        <div :class="styles.settings__item">
          <label :class="styles.settings__label" for="keyName">Имя ключа</label>
          <input 
            id="keyName"
            v-model="keyName"
            :class="styles.settings__input"
            placeholder="id_rsa_tar"
            type="text"
            autocomplete="off"
          >
        </div>
        <div :class="styles.settings__item">
          <label :class="styles.settings__label" for="hostName">Имя хоста</label>
          <input 
            id="hostName"
            v-model="hostName"
            :class="styles.settings__input"
            placeholder="Tar_Git"
            type="text"
            autocomplete="off"
          >
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div :class="styles.content">
      <!-- Шаг 1: Создание SSH ключей -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="01">01</div>
          <h3 :class="styles.step__title">СОЗДАНИЕ SSH КЛЮЧЕЙ</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copyCommand('ssh-keygen')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText('ssh-keygen') }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Введите имя файла: <span :class="styles.code">id_rsa_tar</span></p>
            <p>Нажмите Enter для пустого пароля</p>
          </div>
        </div>
      </div>

      <!-- Шаг 2: Настройка SSH конфига -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="02">02</div>
          <h3 :class="styles.step__title">НАСТРОЙКА SSH КОНФИГА</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">СОЗДАТЬ ФАЙЛ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copyCommand(getConfigCommand())"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText(getConfigCommand()) }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Добавьте эту конфигурацию в файл:</p>
            <div :class="styles.config">
              <pre><code>{{ getConfigContent() }}</code></pre>
            </div>
            <p><strong>Настройка:</strong></p>
            <ul :class="styles.config__list">
              <li><span :class="styles.code">Host</span> - выберите любое имя (например, "МойГит", "Работа")</li>
              <li><span :class="styles.code">IdentityFile</span> - путь к вашему приватному ключу</li>
              <li>Сохраните файл и проверьте: <span :class="styles.code">ssh -T Tar_Git</span></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Шаг 3: Копирование ключа -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="03">03</div>
          <h3 :class="styles.step__title">ИЗВЛЕЧЕНИЕ ПУБЛИЧНОГО КЛЮЧА</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copyCommand(getCopyCommand())"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText(getCopyCommand()) }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Скопируйте весь вывод от <span :class="styles.code">ssh-rsa</span> до конца</p>
          </div>
        </div>
      </div>

      <!-- Шаг 4: Добавление в Gogs -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="04">04</div>
          <h3 :class="styles.step__title">ДОБАВЛЕНИЕ В GOGS</h3>
        </div>
        <div :class="styles.step__body">
          <button 
            :class="[styles.button, styles['button--primary']]"
            @click="openGogs"
          >
            <Icon name="material-symbols:open-in-new" />
            ОТКРЫТЬ GOGS
          </button>
          <div :class="styles.instructions">
            <p>1. Перейдите в <strong>Настройки</strong> → <strong>SSH Keys</strong></p>
            <p>2. Нажмите <strong>Добавить ключ</strong></p>
            <p>3. Вставьте скопированный ключ</p>
          </div>
        </div>
      </div>

      <!-- Шаг 5: Проверка -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="05">05</div>
          <h3 :class="styles.step__title">ПРОВЕРКА ПОДКЛЮЧЕНИЯ</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copyCommand('ssh -T git@git.rosatomtech.ru -p 10022')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText('ssh -T git@git.rosatomtech.ru -p 10022') }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Ожидаемый результат: <span :class="styles.code">Hi there, You've successfully authenticated...</span></p>
          </div>
        </div>
      </div>

      <!-- Шаг 6: Переключение -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="06">06</div>
          <h3 :class="styles.step__title">ПЕРЕКЛЮЧЕНИЕ НА SSH</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copyCommand('git remote set-url origin git@git.rosatomtech.ru:username/repository.git')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText(getRemoteCommand()) }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Замените <span :class="styles.code">username/repository</span> на ваш репозиторий</p>
            <p>Затем выполните: <span :class="styles.code">git pull</span> и <span :class="styles.code">git push</span></p>
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
        <Icon :name="showDetails ? 'material-symbols:expand-less' : 'material-symbols:expand-more'" />
        {{ showDetails ? 'СКРЫТЬ' : 'ПОКАЗАТЬ' }} ДОПОЛНИТЕЛЬНО
      </button>
      
      <div v-if="showDetails" :class="styles.footer__advanced">
        <h4>ДОПОЛНИТЕЛЬНЫЕ КОМАНДЫ</h4>
        <div :class="styles.footer__advancedList">
          <div :class="styles.footer__advancedItem">
            <code>ssh-add -l</code>
            <span>Список загруженных ключей</span>
          </div>
          <div :class="styles.footer__advancedItem">
            <code>ssh-add ~/.ssh/id_rsa_tar</code>
            <span>Добавить ключ в агент</span>
          </div>
          <div :class="styles.footer__advancedItem">
            <code>git remote -v</code>
            <span>Проверить текущий remote</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>

<script setup>
import styles from './Description.module.css'

const showDetails = ref(false)
const activeOS = ref('linux')

// Пользовательские данные
const username = ref('')
const keyName = ref('id_rsa_tar')
const hostName = ref('Tar_Git')

// Анимация копирования
const isAnimating = ref(false)
const animatedText = ref('')
const currentCommand = ref('')

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

const getCopyCommand = () => {
  if (activeOS.value === 'windows') {
    const userProfile = username.value || '%USERPROFILE%'
    return `type ${userProfile}\\.ssh\\${keyName.value}.pub`
  } else {
    return `cat ~/.ssh/${keyName.value}.pub`
  }
}

const getConfigCommand = () => {
  if (activeOS.value === 'windows') {
    const userProfile = username.value || '%USERPROFILE%'
    return `notepad ${userProfile}\\.ssh\\config`
  } else {
    return 'nano ~/.ssh/config'
  }
}

const getConfigContent = () => {
  const keyPath = activeOS.value === 'windows' 
    ? `%USERPROFILE%\\.ssh\\${keyName.value}`
    : `~/.ssh/${keyName.value}`
    
  return `Host ${hostName.value}
    HostName git.rosatomtech.ru
    User git
    Port 10022
    IdentityFile ${keyPath}
    IdentitiesOnly yes`
}

const getRemoteCommand = () => {
  return `git remote set-url origin git@git.rosatomtech.ru:username/repository.git`
}

const openGogs = () => {
  window.open('https://git.rosatomtech.ru/', '_blank')
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<style>
/* CSS модуль импортируется в script setup */
</style>