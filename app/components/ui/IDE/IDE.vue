<template>
  <div :class="styles.ide">
    <!-- Заголовок с tabs -->
    <div :class="styles.header">
      <div :class="styles.header__content">
        <h1 :class="styles.header__title">УДАЛЕННАЯ РАЗРАБОТКА</h1>
        <p :class="styles.header__subtitle">Настройка IDE для работы с проектом</p>
      </div>
      
      <!-- Табы для IDE -->
      <div :class="styles.tabs">
        <button 
          :class="[styles.tabs__item, { [styles['tabs__item--active']]: activeIDE === 'vscode' }]"
          @click="activeIDE = 'vscode'"
        >
          <Icon name="simple-icons:visualstudiocode" />
          VS CODE
        </button>
        <button 
          :class="[styles.tabs__item, { [styles['tabs__item--active']]: activeIDE === 'webstorm' }]"
          @click="activeIDE = 'webstorm'"
        >
          <Icon name="simple-icons:jetbrains" />
          WEBSTORM
        </button>
      </div>
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
          <label :class="styles.settings__label" for="ide-username">Имя пользователя</label>
          <input 
            id="ide-username"
            v-model="username"
            :class="styles.settings__input"
            placeholder="Ваше имя пользователя"
            type="text"
            autocomplete="username"
          />
        </div>
        <div :class="styles.settings__item">
          <label :class="styles.settings__label" for="branch-name">Название ветки</label>
          <input 
            id="branch-name"
            v-model="branchName"
            :class="styles.settings__input"
            placeholder="feature/my-feature"
            type="text"
            autocomplete="off"
          />
        </div>
        <div :class="styles.settings__item">
          <label :class="styles.settings__label" for="project-path">Путь к проекту</label>
          <input 
            id="project-path"
            v-model="projectPath"
            :class="styles.settings__input"
            placeholder="/path/to/project"
            type="text"
            autocomplete="off"
          />
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div :class="styles.content">
      <!-- Шаг 1: Переход в мастер -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="01">01</div>
          <h3 :class="styles.step__title">ПЕРЕХОД В МАСТЕР</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copycommand('git checkout master')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText('git checkout master') }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Переключаемся на основную ветку для получения последних изменений</p>
          </div>
        </div>
      </div>

      <!-- Шаг 2: Обновление мастера -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="02">02</div>
          <h3 :class="styles.step__title">ОБНОВЛЕНИЕ МАСТЕРА</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copycommand('git pull')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText('git pull') }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Получаем последние изменения из удаленного репозитория</p>
          </div>
        </div>
      </div>

      <!-- Шаг 3: Переход в свою ветку -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="03">03</div>
          <h3 :class="styles.step__title">ПЕРЕХОД В СВОЮ ВЕТКУ</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copycommand(getCheckoutcommand())"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText(getCheckoutcommand()) }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Переключаемся на свою рабочую ветку</p>
          </div>
        </div>
      </div>

      <!-- Шаг 4: Слияние с мастером -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="04">04</div>
          <h3 :class="styles.step__title">СЛИЯНИЕ С МАСТЕРОМ</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copycommand('git merge master')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText('git merge master') }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Вливаем изменения из мастера в свою ветку</p>
          </div>
        </div>
      </div>

      <!-- Шаг 5: Запуск в песочнице -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="05">05</div>
          <h3 :class="styles.step__title">ЗАПУСК В ПЕСОЧНИЦЕ</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copycommand(getDevcommand())"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText(getDevcommand()) }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Запускаем проект для тестирования в своей песочнице</p>
          </div>
        </div>
      </div>

      <!-- Шаг 6: Настройка конфигурации -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="06">06</div>
          <h3 :class="styles.step__title">НАСТРОЙКА КОНФИГУРАЦИИ</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ОТКРЫТЬ ФАЙЛ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copycommand('code configuration.js')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText(getconfigcommand()) }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Раскомментируйте строки для sandbox в файле configuration.js:</p>
             <div :class="styles.config">
              <pre><code>{{ getconfigContent() }}</code></pre>
            </div>
            <p><strong>Важно:</strong> Проверьте правильность ссылок, чтобы не затереть чужие папки!</p>
          </div>
        </div>
      </div>

      <!-- Шаг 7: Сборка для теста -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="07">07</div>
          <h3 :class="styles.step__title">СБОРКА ДЛЯ ТЕСТА</h3>
        </div>
        <div :class="styles.step__body">
          <div :class="styles.command">
            <div :class="styles.command__header">
              <span :class="styles.command__label">ВЫПОЛНИТЬ</span>
              <button 
                :class="[styles.button, styles['button--copy']]"
                @click="copycommand('npm run build')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div :class="styles.command__code">
              <code>{{ getDisplayText('npm run build') }}</code>
            </div>
          </div>
          <div :class="styles.instructions">
            <p>Собираем проект для деплоя в тестовую песочницу</p>
            <p>Адрес песочницы: <span :class="styles.Code">http://78.142.221.162:3000/test/{{ username || 'username' }}#</span></p>
          </div>
        </div>
      </div>

      <!-- Шаг 8: Проверка на предпроде -->
      <div :class="styles.step">
        <div :class="styles.step__header">
          <div :class="styles.step__number" data-number="08">08</div>
          <h3 :class="styles.step__title">ПРОВЕРКА НА ПРЕДПРОДЕ</h3>
        </div>
        <div :class="styles.step__body">
          <button 
            :class="[styles.button, styles['button--primary']]"
            @click="openPreprod"
          >
            <Icon name="material-symbols:open-in-new" />
            ОТКРЫТЬ ПРЕДПРОД
          </button>
          <div :class="styles.instructions">
            <p>1. Проверьте работу на предпроде: <strong>booster.rosatomtech.ru</strong></p>
            <p>2. Если всё ОК, зовите "сверхлюдей" для проверки бэка и прода</p>
            <p>3. После успешной проверки - деплой в прод</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Дополнительная информация -->
    <div :class="styles.Footer">
      <button 
        :class="styles.Toggle"
        @click="toggleDetails"
      >
        <Icon :name="showDetails ? 'material-symbols:expand-less' : 'material-symbols:expand-more'" />
        {{ showDetails ? 'СКРЫТЬ' : 'ПОКАЗАТЬ' }} ДОПОЛНИТЕЛЬНО
      </button>
      
      <div v-if="showDetails" :class="styles.footer__advanced">
        <h4>ДОПОЛНИТЕЛЬНЫЕ КОМАНДЫ</h4>
        <div :class="styles.footer__advanced__list">
          <div :class="styles.footer__advanced__item">
            <code>git status</code>
            <span>Проверить статус репозитория</span>
          </div>
          <div :class="styles.footer__advanced__item">
            <code>git branch -a</code>
            <span>Показать все ветки</span>
          </div>
          <div :class="styles.footer__advanced__item">
            <code>git log --oneline -10</code>
            <span>Последние 10 коммитов</span>
          </div>
          <div :class="styles.footer__advanced__item">
            <code>npm run serve</code>
            <span>Запуск dev сервера</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import styles from './IDE.module.css'

const showDetails = ref(false)
const activeIDE = ref('vscode')

// Пользовательские данные
const username = ref('')
const branchName = ref('feature/my-feature')
const projectPath = ref('/path/to/project')

// Анимация копирования
const isAnimating = ref(false)
const animatedText = ref('')
const currentCommand = ref('')

const copycommand = async (command) => {
  if (isAnimating.value) return
  
  try {
    await navigator.clipboard.writeText(command)
    console.log('command copied:', command)
    
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

const getCheckoutcommand = () => {
  return branchName.value ? `git checkout ${branchName.value}` : 'git checkout feature/my-feature'
}

const getDevcommand = () => {
  return activeIDE.value === 'vscode' ? 'npm run serve' : 'npm run dev'
}

const getconfigcommand = () => {
  return activeIDE.value === 'vscode' ? 'code configuration.js' : 'webstorm configuration.js'
}

const getconfigContent = () => {
  return `// Раскомментируйте эти строки для sandbox:
// main_app_url: "/",
// api_url: "/api/booster",

// Закомментируйте эти строки:
main_app_url: "http://78.142.221.162:3000",
api_url: "http://78.142.221.162:3000/api/booster",`
}

const openPreprod = () => {
  window.open('https://booster.rosatomtech.ru/', '_blank')
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<style>
/* CSS модуль импортируется в script setup */
</style>
