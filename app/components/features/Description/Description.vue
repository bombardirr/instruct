<template>
  <div class="cyber-description">
    <!-- Заголовок -->
    <div class="cyber-header">
      <div class="cyber-header__content">
        <h1 class="cyber-title">SSH CONFIGURATION</h1>
        <p class="cyber-subtitle">Secure repository access setup</p>
      </div>
      <div class="cyber-header__accent"></div>
    </div>

    <!-- Табы для ОС -->
    <div class="os-tabs">
      <button 
        class="os-tab"
        :class="{ 'os-tab--active': activeOS === 'linux' }"
        @click="activeOS = 'linux'"
      >
        <Icon name="simple-icons:linux" />
        LINUX
      </button>
      <button 
        class="os-tab"
        :class="{ 'os-tab--active': activeOS === 'windows' }"
        @click="activeOS = 'windows'"
      >
        <Icon name="simple-icons:windows" />
        WINDOWS
      </button>
    </div>

    <!-- Контент -->
    <div class="cyber-content">
      <!-- Шаг 1: Создание SSH ключей -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">01</div>
          <h3 class="cyber-step__title">GENERATE SSH KEYS</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">EXECUTE</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand('ssh-keygen')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>ssh-keygen</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Enter filename: <span class="cyber-code">id_rsa_tar</span></p>
            <p>Press Enter for empty passphrase</p>
          </div>
        </div>
      </div>

      <!-- Шаг 2: Копирование ключа -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">02</div>
          <h3 class="cyber-step__title">EXTRACT PUBLIC KEY</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">EXECUTE</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand(getCopyCommand())"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>{{ getCopyCommand() }}</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Copy entire output from <span class="cyber-code">ssh-rsa</span> to end</p>
          </div>
        </div>
      </div>

      <!-- Шаг 3: Добавление в Gogs -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">03</div>
          <h3 class="cyber-step__title">ADD TO GOGS</h3>
        </div>
        <div class="cyber-step__body">
          <button 
            class="cyber-button cyber-button--primary"
            @click="openGogs"
          >
            <Icon name="material-symbols:open-in-new" />
            OPEN GOGS
          </button>
          <div class="cyber-instructions">
            <p>1. Go to <strong>Settings</strong> → <strong>SSH Keys</strong></p>
            <p>2. Click <strong>Add Key</strong></p>
            <p>3. Paste copied key</p>
          </div>
        </div>
      </div>

      <!-- Шаг 4: Проверка -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">04</div>
          <h3 class="cyber-step__title">VERIFY CONNECTION</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">EXECUTE</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand('ssh -T git@git.rosatomtech.ru -p 10022')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>ssh -T git@git.rosatomtech.ru -p 10022</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Expected: <span class="cyber-code">Hi there, You've successfully authenticated...</span></p>
          </div>
        </div>
      </div>

      <!-- Шаг 5: Переключение -->
      <div class="cyber-step">
        <div class="cyber-step__header">
          <div class="cyber-step__number">05</div>
          <h3 class="cyber-step__title">SWITCH TO SSH</h3>
        </div>
        <div class="cyber-step__body">
          <div class="cyber-command">
            <div class="cyber-command__header">
              <span class="cyber-command__label">EXECUTE</span>
              <button 
                class="cyber-button cyber-button--copy"
                @click="copyCommand('git remote set-url origin git@git.rosatomtech.ru:username/repository.git')"
              >
                <Icon name="material-symbols:content-copy" />
              </button>
            </div>
            <div class="cyber-command__code">
              <code>git remote set-url origin git@git.rosatomtech.ru:username/repository.git</code>
            </div>
          </div>
          <div class="cyber-instructions">
            <p>Replace <span class="cyber-code">username/repository</span> with your repo</p>
            <p>Then run: <span class="cyber-code">git pull</span> and <span class="cyber-code">git push</span></p>
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
        {{ showDetails ? 'HIDE' : 'SHOW' }} ADVANCED
      </button>
      
      <div v-if="showDetails" class="cyber-advanced">
        <h4>ADVANCED COMMANDS</h4>
        <div class="cyber-advanced__list">
          <div class="cyber-advanced__item">
            <code>ssh-add -l</code>
            <span>List loaded keys</span>
          </div>
          <div class="cyber-advanced__item">
            <code>ssh-add ~/.ssh/id_rsa_tar</code>
            <span>Add key to agent</span>
          </div>
          <div class="cyber-advanced__item">
            <code>git remote -v</code>
            <span>Check current remote</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const showDetails = ref(false)
const activeOS = ref('linux')

const copyCommand = async (command) => {
  try {
    await navigator.clipboard.writeText(command)
    console.log('Command copied:', command)
  } catch (err) {
    console.error('Copy error:', err)
  }
}

const getCopyCommand = () => {
  return activeOS.value === 'windows' 
    ? 'type %USERPROFILE%\\.ssh\\id_rsa_tar.pub'
    : 'cat ~/.ssh/id_rsa_tar.pub'
}

const openGogs = () => {
  window.open('https://git.rosatomtech.ru/', '_blank')
}

const toggleDetails = () => {
  showDetails.value = !showDetails.value
}
</script>

<style>
@import "tailwindcss";

.cyber-description {
  @apply w-full h-full;
  @apply p-6;
  @apply overflow-y-auto;
  @apply bg-slate-900;
  @apply text-slate-100;
  @apply font-mono;
}

/* Заголовок */
.cyber-header {
  @apply relative;
  @apply mb-8;
  @apply p-6;
  @apply bg-slate-800;
  @apply border border-slate-700;
  @apply [clip-path:polygon(0_0,calc(100%_-_20px)_0,100%_20px,100%_100%,20px_100%,0_calc(100%_-_20px))];
  @apply overflow-hidden;
}

.cyber-header__content {
  @apply relative z-10;
}

.cyber-title {
  @apply text-4xl font-bold;
  @apply text-slate-100;
  @apply mb-2;
  @apply tracking-wider;
}

.cyber-subtitle {
  @apply text-slate-400;
  @apply text-sm;
  @apply uppercase;
  @apply tracking-widest;
}

.cyber-header__accent {
  @apply absolute top-0 right-0;
  @apply w-32 h-32;
  @apply bg-slate-700/30;
  @apply [clip-path:polygon(100%_0,100%_100%,0_100%)];
}

/* Табы ОС */
.os-tabs {
  @apply flex;
  @apply mb-8;
  @apply gap-2;
}

.os-tab {
  @apply flex items-center gap-2;
  @apply px-6 py-3;
  @apply bg-slate-800;
  @apply border border-slate-700;
  @apply text-slate-400;
  @apply text-sm font-bold;
  @apply uppercase tracking-wider;
  @apply transition-all duration-300;
  @apply [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))];
  @apply hover:text-slate-200;
  @apply hover:border-slate-600;
}

.os-tab--active {
  @apply bg-slate-700;
  @apply text-slate-100;
  @apply border-slate-600;
}

/* Контент */
.cyber-content {
  @apply space-y-6;
}

/* Шаги */
.cyber-step {
  @apply bg-slate-800/50;
  @apply border border-slate-700;
  @apply [clip-path:polygon(0_0,calc(100%_-_16px)_0,100%_16px,100%_100%,16px_100%,0_calc(100%_-_16px))];
  @apply overflow-hidden;
  @apply transition-all duration-300;
  @apply hover:border-slate-600;
}

.cyber-step__header {
  @apply flex items-center gap-4;
  @apply p-4;
  @apply bg-slate-800;
  @apply border-b border-slate-700;
}

.cyber-step__number {
  @apply flex items-center justify-center;
  @apply w-12 h-12;
  @apply bg-slate-600;
  @apply text-slate-100;
  @apply font-bold;
  @apply text-lg;
  @apply [clip-path:polygon(0_0,calc(100%_-_8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%_-_8px))];
}

.cyber-step__title {
  @apply text-xl font-bold;
  @apply text-slate-100;
  @apply uppercase tracking-wider;
}

.cyber-step__body {
  @apply p-6;
  @apply space-y-4;
}

/* Команды */
.cyber-command {
  @apply bg-slate-900;
  @apply border border-slate-700;
  @apply [clip-path:polygon(0_0,calc(100%_-_8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%_-_8px))];
  @apply overflow-hidden;
}

.cyber-command__header {
  @apply flex items-center justify-between;
  @apply px-4 py-2;
  @apply bg-slate-800;
  @apply border-b border-slate-700;
}

.cyber-command__label {
  @apply text-xs font-bold;
  @apply text-slate-400;
  @apply uppercase tracking-widest;
}

.cyber-command__code {
  @apply px-4 py-3;
  @apply font-mono;
  @apply text-green-400;
  @apply text-sm;
  @apply break-all;
  @apply bg-slate-950;
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
}

.cyber-button--copy {
  @apply bg-slate-600;
  @apply text-slate-100;
  @apply hover:bg-slate-500;
}

.cyber-button--primary {
  @apply bg-slate-700;
  @apply text-slate-100;
  @apply hover:bg-slate-600;
  @apply px-6 py-3;
}

/* Инструкции */
.cyber-instructions {
  @apply space-y-2;
  @apply text-slate-300;
  @apply text-sm;
}

.cyber-code {
  @apply bg-slate-700;
  @apply px-2 py-1;
  @apply text-slate-200;
  @apply font-mono;
  @apply text-xs;
  @apply [clip-path:polygon(0_0,calc(100%_-_4px)_0,100%_4px,100%_100%,4px_100%,0_calc(100%_-_4px))];
}

/* Футер */
.cyber-footer {
  @apply mt-8;
  @apply pt-6;
  @apply border-t border-slate-700;
}

.cyber-toggle {
  @apply flex items-center gap-2;
  @apply px-4 py-2;
  @apply bg-slate-800;
  @apply text-slate-300;
  @apply text-sm font-bold;
  @apply uppercase tracking-wider;
  @apply [clip-path:polygon(0_0,calc(100%_-_8px)_0,100%_8px,100%_100%,8px_100%,0_calc(100%_-_8px))];
  @apply transition-all duration-200;
  @apply hover:bg-slate-700;
  @apply hover:text-slate-100;
}

.cyber-advanced {
  @apply mt-4;
  @apply p-4;
  @apply bg-slate-800/50;
  @apply border border-slate-700;
  @apply [clip-path:polygon(0_0,calc(100%_-_12px)_0,100%_12px,100%_100%,12px_100%,0_calc(100%_-_12px))];
}

.cyber-advanced h4 {
  @apply text-slate-200;
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
  @apply bg-slate-700/50;
  @apply border border-slate-700;
  @apply [clip-path:polygon(0_0,calc(100%_-_6px)_0,100%_6px,100%_100%,6px_100%,0_calc(100%_-_6px))];
}

.cyber-advanced__item code {
  @apply text-slate-200;
  @apply font-mono;
  @apply text-xs;
}

.cyber-advanced__item span {
  @apply text-slate-400;
  @apply text-xs;
}
</style>