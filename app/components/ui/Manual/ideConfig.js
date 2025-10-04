export const ideConfig = {
  title: 'УДАЛЕННАЯ РАЗРАБОТКА',
  subtitle: 'Настройка IDE для работы с проектом',
  activeTab: 'vscode',
  tabs: [
    { id: 'vscode', label: 'VS CODE', icon: 'simple-icons:visualstudiocode' },
    { id: 'webstorm', label: 'WEBSTORM', icon: 'simple-icons:jetbrains' }
  ],
  settings: [
    { 
      id: 'username', 
      label: 'Имя пользователя', 
      placeholder: 'Ваше имя пользователя',
      type: 'text',
      autocomplete: 'username',
      defaultValue: ''
    },
    { 
      id: 'branchName', 
      label: 'Название ветки', 
      placeholder: 'feature/my-feature',
      type: 'text',
      autocomplete: 'off',
      defaultValue: 'feature/my-feature'
    },
    { 
      id: 'projectPath', 
      label: 'Путь к проекту', 
      placeholder: '/path/to/project',
      type: 'text',
      autocomplete: 'off',
      defaultValue: '/path/to/project'
    }
  ],
  steps: [
    {
      number: '01',
      title: 'ПЕРЕХОД В МАСТЕР',
      type: 'command',
      command: 'git checkout master',
      instructions: [
        'Переключаемся на основную ветку для получения последних изменений'
      ]
    },
    {
      number: '02',
      title: 'ОБНОВЛЕНИЕ МАСТЕРА',
      type: 'command',
      command: 'git pull',
      instructions: [
        'Получаем последние изменения из удаленного репозитория'
      ]
    },
    {
      number: '03',
      title: 'ПЕРЕХОД В СВОЮ ВЕТКУ',
      type: 'command',
      command: (activeTab, settingsData) => {
        return settingsData.branchName ? `git checkout ${settingsData.branchName}` : 'git checkout feature/my-feature'
      },
      instructions: [
        'Переключаемся на свою рабочую ветку'
      ]
    },
    {
      number: '04',
      title: 'СЛИЯНИЕ С МАСТЕРОМ',
      type: 'command',
      command: 'git merge master',
      instructions: [
        'Вливаем изменения из мастера в свою ветку'
      ]
    },
    {
      number: '05',
      title: 'ЗАПУСК В ПЕСОЧНИЦЕ',
      type: 'command',
      command: (activeTab) => {
        return activeTab === 'vscode' ? 'npm run serve' : 'npm run dev'
      },
      instructions: [
        'Запускаем проект для тестирования в своей песочнице'
      ]
    },
    {
      number: '06',
      title: 'НАСТРОЙКА КОНФИГУРАЦИИ',
      type: 'command',
      command: (activeTab) => {
        return activeTab === 'vscode' ? 'code configuration.js' : 'webstorm configuration.js'
      },
      commandLabel: 'ОТКРЫТЬ ФАЙЛ',
      instructions: [
        'Раскомментируйте строки для sandbox в файле configuration.js:'
      ],
      configContent: `// Раскомментируйте эти строки для sandbox:
// main_app_url: "/",
// api_url: "/api/booster",

// Закомментируйте эти строки:
main_app_url: "http://78.142.221.162:3000",
api_url: "http://78.142.221.162:3000/api/booster",`,
      configList: [
        '<strong>Важно:</strong> Проверьте правильность ссылок, чтобы не затереть чужие папки!'
      ]
    },
    {
      number: '07',
      title: 'СБОРКА ДЛЯ ТЕСТА',
      type: 'command',
      command: 'npm run build',
      instructions: [
        'Собираем проект для деплоя в тестовую песочницу',
        { text: 'Адрес песочницы: ', code: 'http://78.142.221.162:3000/test/{{ username || \'username\' }}#' }
      ]
    },
    {
      number: '08',
      title: 'ПРОВЕРКА НА ПРЕДПРОДЕ',
      type: 'button',
      buttonText: 'ОТКРЫТЬ ПРЕДПРОД',
      buttonIcon: 'material-symbols:open-in-new',
      buttonAction: 'openPreprod',
      instructions: [
        '1. Проверьте работу на предпроде: <strong>booster.rosatomtech.ru</strong>',
        '2. Если всё ОК, зовите "сверхлюдей" для проверки бэка и прода',
        '3. После успешной проверки - деплой в прод'
      ]
    }
  ]
}
