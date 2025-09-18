<template>
  <div class="cyber-description">
    <!-- Заголовок -->
    <div class="cyber-header">
      <div class="cyber-header__content">
        <h1 class="cyber-title">УДАЛЕННАЯ РАЗРАБОТКА</h1>
        <p class="cyber-subtitle">Настройка IDE для работы с проектом</p>
      </div>
      <div class="cyber-header__accent"></div>
    </div>

    <!-- Табы для IDE -->
    <div class="os-tabs">
      <button 
        class="os-tab"
        :class="{ 'os-tab--active': activeIDE === 'vscode' }"
        @click="activeIDE = 'vscode'"
      >
        <Icon name="simple-icons:visualstudiocode" />
        VS CODE
      </button>
      <button 
        class="os-tab"
        :class="{ 'os-tab--active': activeIDE === 'webstorm' }"
        @click="activeIDE = 'webstorm'"
      >
        <Icon name="simple-icons:jetbrains" />
        WEBSTORM
      </button>
    </div>

    <!-- Настройки пользователя -->
    <div class="user-settings">
      <h3 class="user-settings__title">НАСТРОЙКИ</h3>
      <div class="user-settings__grid">
        <div class="user-settings__item">
          <label class="user-settings__label">Имя пользователя</label>
          <input 
            v-model="username"
            class="user-settings__input"
            placeholder="Ваше имя пользователя"
            type="text"
          />
        </div>
        <div class="user-settings__item">
          <label class="user-settings__label">Название ветки</label>
          <input 
            v-model="branchName"
            class="user-settings__input"
            placeholder="feature/my-feature"
            type="text"
          />
        </div>
        <div class="user-settings__item">
          <label class="user-settings__label">Путь к проекту</label>
          <input 
            v-model="projectPath"
            class="user-settings__input"
            placeholder="/path/to/project"
            type="text"
          />
        </div>
      </div>
    </div>

    <!-- Контент -->
    <div class="cyber-content">
      <!-- Шаг 1: Переход в мастер -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">01</div>
          <h3 class="cyber-step__title">ПЕРЕХОД В МАСТЕР</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">ВЫПОЛНИТЬ</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand('git checkout master')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>git checkout master</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Переключаемся на основную ветку для получения последних изменений</p>
          </div>
        </div>
      </div>

      <!-- Шаг 2: Обновление мастера -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">02</div>
          <h3 class="cyber-step__title">ОБНОВЛЕНИЕ МАСТЕРА</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">ВЫПОЛНИТЬ</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand('git pull')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>git pull</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Получаем последние изменения из удаленного репозитория</p>
          </div>
        </div>
      </div>

      <!-- Шаг 3: Переход в свою ветку -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">03</div>
          <h3 class="cyber-step__title">ПЕРЕХОД В СВОЮ ВЕТКУ</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">ВЫПОЛНИТЬ</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand(getCheckoutCommand())"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>{{ getCheckoutCommand() }}</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Переключаемся на свою рабочую ветку</p>
          </div>
        </div>
      </div>

      <!-- Шаг 4: Слияние с мастером -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">04</div>
          <h3 class="cyber-step__title">СЛИЯНИЕ С МАСТЕРОМ</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">ВЫПОЛНИТЬ</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand('git merge master')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>git merge master</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Вливаем изменения из мастера в свою ветку</p>
          </div>
        </div>
      </div>

      <!-- Шаг 5: Запуск в песочнице -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">05</div>
          <h3 class="cyber-step__title">ЗАПУСК В ПЕСОЧНИЦЕ</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">ВЫПОЛНИТЬ</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand(getDevCommand())"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>{{ getDevCommand() }}</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Запускаем проект для тестирования в своей песочнице</p>
          </div>
        </div>
      </div>

      <!-- Шаг 6: Настройка конфигурации -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">06</div>
          <h3 class="cyber-step__title">НАСТРОЙКА КОНФИГУРАЦИИ</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">ОТКРЫТЬ ФАЙЛ</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand('code Configuration.js')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>{{ getConfigCommand() }}</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Раскомментируйте строки для sandbox в файле Configuration.js:</p>
            <div class="cyber-config-block">
              <pre><code>{{ getConfigContent() }}</code></pre>
            </div>
            <p><strong>Важно:</strong> Проверьте правильность ссылок, чтобы не затереть чужие папки!</p>
          </div>
        </div>
      </div>

      <!-- Шаг 7: Сборка для теста -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">07</div>
          <h3 class="cyber-step__title">СБОРКА ДЛЯ ТЕСТА</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">ВЫПОЛНИТЬ</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand('npm run build')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>npm run build</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Собираем проект для деплоя в тестовую песочницу</p>
            <p>Адрес песочницы: <span class="cyber-code">http://78.142.221.162:3000/test/{{ username || 'username' }}#</span></p>
          </div>
        </div>
      </div>

      <!-- Шаг 8: Проверка на предпроде -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">08</div>
          <h3 class="cyber-step__title">ПРОВЕРКА НА ПРЕДПРОДЕ</h3>
        </div>
        <div class="cyber-step__body">
          <button 
            class="cyber-button cyber-button--primary"
            @click="openPreprod"
          >
            <Icon name="material-symbols:open-in-new" />
            ОТКРЫТЬ ПРЕДПРОД
          </button>
          <div class="cyber-instructions">
            <p>1. Проверьте работу на предпроде: <strong>booster.rosatomtech.ru</strong></p>
            <p>2. Если всё ОК, зовите "сверхлюдей" для проверки бэка и прода</p>
            <p>3. После успешной проверки - деплой в прод</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Дополнительная информация -->
    <div class="cyber-footer">
      <button 
        class="cyber-toggle"
        @click="toggleDetails"
      >
        <Icon :name="showDetails ? 'material-symbols:expand-less' : 'material-symbols:expand-more'" />
        {{ showDetails ? 'СКРЫТЬ' : 'ПОКАЗАТЬ' }} ДОПОЛНИТЕЛЬНО
      </button>
      
      <div v-if="showDetails" class="cyber-advanced">
        <h4>ДОПОЛНИТЕЛЬНЫЕ КОМАНДЫ</h4>
        <div class="cyber-advanced__list">
          <div class="cyber-advanced__item">
            <code>git status</code>
            <span>Проверить статус репозитория</span>
          </div>
          <div class="cyber-advanced__item">
            <code>git branch -a</code>
            <span>Показать все ветки</span>
          </div>
          <div class="cyber-advanced__item">
            <code>git log --oneline -10</code>
            <span>Последние 10 коммитов</span>
          </div>
          <div class="cyber-advanced__item">
            <code>npm run serve</code>
            <span>Запуск dev сервера</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showDetails = ref(false)
const activeIDE = ref('vscode')

// Пользовательские данные
const username = ref('')
const branchName = ref('feature/my-feature')
const projectPath = ref('/path/to/project')

const copyCommand = async (command) => {
  try {
    await navigator.clipboard.writeText(command)
    console.log('Command copied:', command)
  } catch (err) {
    console.error('Copy error:', err)
  }
}

const getCheckoutCommand = () => {
  return branchName.value ? `git checkout ${branchName.value}` : 'git checkout feature/my-feature'
}

const getDevCommand = () => {
  return activeIDE.value === 'vscode' ? 'npm run serve' : 'npm run dev'
}

const getConfigCommand = () => {
  return activeIDE.value === 'vscode' ? 'code Configuration.js' : 'webstorm Configuration.js'
}

const getConfigContent = () => {
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
@import "tailwindcss";

.cyber-description {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  overflow-y: auto;
  background-color: var(--ag-black-tertiary);
  color: var(--ag-white-primary);
  font-family: 'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
}

/* Заголовок */
.cyber-header {
  @apply relative;
  @apply mb-8;
  @apply p-6;
  @apply bg-[var(--ag-gray-primary)];
  @apply border border-[var(--ag-gray-secondary)];
  @apply [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%_-_20px))];
  @apply overflow-hidden;
}

.cyber-header__content {
  @apply relative z-10;
}

.cyber-title {
  @apply text-4xl font-bold;
  @apply text-[var(--ag-white-primary)];
  @apply mb-2;
  @apply tracking-wider;
}

.cyber-subtitle {
  @apply text-[var(--ag-gray-light)];
  @apply text-sm;
  @apply uppercase;
  @apply tracking-widest;
}

.cyber-header__accent {
  @apply absolute top-0 right-0;
  @apply w-32 h-32;
  @apply bg-[var(--ag-gray-secondary)]/30;
  @apply [clip-path:polygon(100%_0,100%_100%,0_100%)];
}

/* Табы IDE */
.os-tabs {
  @apply flex;
  @apply mb-8;
  @apply gap-2;
}

.os-tab {
  @apply flex items-center gap-2;
  @apply px-6 py-3;
  @apply bg-[var(--ag-gray-primary)];
  @apply border border-[var(--ag-gray-secondary)];
  @apply text-[var(--ag-gray-light)];
  @apply text-sm font-bold;
  @apply uppercase tracking-wider;
  @apply transition-all duration-300;
  @apply [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))];
  @apply hover:text-[var(--ag-white-secondary)];
  @apply hover:border-[var(--ag-gray-tertiary)];
  @apply cursor-pointer;
}

.os-tab--active {
  @apply bg-[var(--ag-gray-secondary)];
  @apply text-[var(--ag-white-primary)];
  @apply border-[var(--ag-gray-tertiary)];
}

/* Настройки пользователя */
.user-settings {
  @apply mb-8;
  @apply p-6;
  @apply bg-[var(--ag-gray-primary)];
  @apply border border-[var(--ag-gray-secondary)];
  @apply [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))];
}

.user-settings__title {
  @apply text-[var(--ag-white-primary)];
  @apply font-bold;
  @apply text-lg;
  @apply mb-4;
  @apply uppercase tracking-wider;
}

.user-settings__grid {
  @apply grid grid-cols-1 md:grid-cols-3 gap-4;
}

.user-settings__item {
  @apply flex flex-col gap-2;
}

.user-settings__label {
  @apply text-[var(--ag-gray-lighter)];
  @apply text-sm;
  @apply font-medium;
}

.user-settings__input {
  @apply px-3 py-2;
  @apply bg-[var(--ag-black-tertiary)];
  @apply border border-[var(--ag-gray-tertiary)];
  @apply text-[var(--ag-white-primary)];
  @apply font-mono;
  @apply text-sm;
  @apply rounded;
  @apply transition-all duration-200;
  @apply focus:border-[var(--ag-gray-light)];
  @apply focus:outline-none;
}

.user-settings__input::placeholder {
  @apply text-[var(--ag-gray-light)];
}

/* Контент */
.cyber-content {
  @apply space-y-6;
}

/* Шаги */
.cyber-step {
  @apply bg-[var(--ag-gray-primary)]/50;
  @apply border border-[var(--ag-gray-secondary)];
  @apply [clip-path:polygon(0_0,calc(100%_-_16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%_-_16px))];
  @apply overflow-hidden;
  @apply transition-all duration-300;
  @apply hover:border-[var(--ag-gray-tertiary)];
}

.cyber-step__header {
  @apply flex items-center gap-4;
  @apply p-4;
  @apply bg-[var(--ag-gray-primary)];
  @apply border-b border-[var(--ag-gray-secondary)];
}

.cyber-step__number {
  @apply flex items-center justify-center;
  @apply w-12 h-12;
  @apply bg-[var(--ag-gray-tertiary)];
  @apply text-[var(--ag-white-primary)];
  @apply font-bold;
  @apply text-lg;
  @apply [clip-path:polygon(0_0,calc(100%_-_8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%_-_8px))];
}

.cyber-step__title {
  @apply text-xl font-bold;
  @apply text-[var(--ag-white-primary)];
  @apply uppercase tracking-wider;
}

.cyber-step__body {
  @apply p-6;
  @apply space-y-4;
}

/* Команды */
.cyber-command {
  @apply bg-[var(--ag-gray-primary)];
  @apply border border-[var(--ag-gray-secondary)];
  @apply [clip-path:polygon(0_0,calc(100%_-_8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%_-_8px))];
  @apply overflow-hidden;
  @apply shadow-lg;
}

.cyber-command__header {
  @apply flex items-center justify-between;
  @apply px-4 py-2;
  @apply bg-[var(--ag-gray-secondary)];
  @apply border-b border-[var(--ag-gray-tertiary)];
}

.cyber-command__label {
  @apply text-xs font-bold;
  @apply text-[var(--ag-white-primary)];
  @apply uppercase tracking-widest;
}

.cyber-command__code {
  @apply px-4 py-3;
  @apply font-mono;
  @apply text-[var(--ag-white-primary)];
  @apply text-sm;
  @apply break-all;
  @apply bg-[var(--ag-black-tertiary)];
  @apply border-t border-[var(--ag-gray-tertiary)];
}

/* Кнопки */
.cyber-button {
  @apply flex items-center gap-2;
  @apply px-3 py-2;
  @apply font-bold;
  @apply text-xs;
  @apply uppercase tracking-wider;
  @apply transition-all duration-200;
  @apply [clip-path:polygon(0_0,calc(100%_-_6px)_0,100%_6px,100%_100%,6px_100%,0_calc(100%_-_6px))];
  @apply active:scale-95;
  @apply cursor-pointer;
}

.cyber-button--copy {
  @apply bg-[var(--ag-gray-light)];
  @apply text-[var(--ag-black-primary)];
  @apply hover:bg-[var(--ag-white-secondary)];
  @apply hover:text-[var(--ag-black-primary)];
}

.cyber-button--primary {
  @apply bg-[var(--ag-white-primary)];
  @apply text-[var(--ag-black-primary)];
  @apply hover:bg-[var(--ag-white-secondary)];
  @apply px-6 py-3;
}

/* Инструкции */
.cyber-instructions {
  @apply space-y-2;
  @apply text-[var(--ag-white-secondary)];
  @apply text-sm;
}

.cyber-code {
  @apply bg-[var(--ag-gray-primary)];
  @apply px-2 py-1;
  @apply text-[var(--ag-white-primary)];
  @apply font-mono;
  @apply text-xs;
  @apply [clip-path:polygon(0_0,calc(100%_-_4px)_0,100%_4px,100%_100%,4px_100%,0_calc(100%_-_4px))];
}

.cyber-config-block {
  @apply mt-3;
  @apply p-4;
  @apply bg-[var(--ag-gray-primary)];
  @apply border border-[var(--ag-gray-secondary)];
  @apply [clip-path:polygon(0_0,calc(100%_-_8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%_-_8px))];
  @apply overflow-x-auto;
  @apply shadow-md;
}

.cyber-config-block pre {
  @apply text-[var(--ag-white-primary)];
  @apply font-mono;
  @apply text-sm;
  @apply whitespace-pre;
}

.cyber-config-list {
  @apply mt-3;
  @apply space-y-2;
  @apply text-sm;
}

.cyber-config-list li {
  @apply flex items-start gap-2;
}

/* Футер */
.cyber-footer {
  @apply mt-8;
  @apply pt-6;
  @apply border-t border-[var(--ag-gray-tertiary)];
}

.cyber-toggle {
  @apply flex items-center gap-2;
  @apply px-4 py-2;
  @apply bg-[var(--ag-gray-primary)];
  @apply text-[var(--ag-white-secondary)];
  @apply text-sm font-bold;
  @apply uppercase tracking-wider;
  @apply [clip-path:polygon(0_0,calc(100%_-_8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%_-_8px))];
  @apply transition-all duration-200;
  @apply hover:bg-[var(--ag-gray-secondary)];
  @apply hover:text-[var(--ag-white-primary)];
  @apply cursor-pointer;
}

.cyber-advanced {
  @apply mt-4;
  @apply p-4;
  @apply bg-[var(--ag-gray-secondary)];
  @apply border border-[var(--ag-gray-light)];
  @apply [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))];
  @apply shadow-md;
}

.cyber-advanced h4 {
  @apply text-[var(--ag-white-primary)];
  @apply font-bold;
  @apply mb-3;
  @apply uppercase tracking-wider;
}

.cyber-advanced__list {
  @apply space-y-2;
}

.cyber-advanced__item {
  @apply flex items-center justify-between;
  @apply p-2;
  @apply bg-[var(--ag-gray-primary)];
  @apply border border-[var(--ag-gray-light)];
  @apply [clip-path:polygon(0_0,calc(100%_-_6px)_0,100%_6px,100%_100%,6px_100%,0_calc(100%_-_6px))];
}

.cyber-advanced__item code {
  @apply text-[var(--ag-white-primary)];
  @apply font-mono;
  @apply text-xs;
}

.cyber-advanced__item span {
  @apply text-[var(--ag-gray-lighter)];
  @apply text-xs;
}
</style>
