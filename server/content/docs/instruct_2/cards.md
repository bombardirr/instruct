---
id: 'ide-setup'
title: 'УДАЛЕННАЯ РАЗРАБОТКА'
subtitle: 'Настройка IDE для работы с проектом'
order: 2
icon: 'simple-icons:visualstudiocode'
activeTab: 'vscode'
tabs:
  - id: 'vscode'
    label: 'VS CODE'
    icon: 'simple-icons:visualstudiocode'
  - id: 'webstorm'
    label: 'WEBSTORM'
    icon: 'simple-icons:jetbrains'
settings:
  - id: 'username'
    label: 'Имя пользователя'
    placeholder: 'Ваше имя пользователя'
    type: 'text'
    autocomplete: 'username'
    defaultValue: ''
    visibleFor: ['vscode', 'webstorm']
  - id: 'branchName'
    label: 'Название ветки'
    placeholder: 'feature/my-feature'
    type: 'text'
    autocomplete: 'off'
    defaultValue: 'feature/my-feature'
    visibleFor: ['vscode', 'webstorm']
---

## Шаг 01: ПЕРЕХОД В МАСТЕР

**Команда Linux:** `git checkout master`
**Команда Windows:** `git checkout master`

**Инструкции:**
- Переключаемся на основную ветку для получения последних изменений

---

## Шаг 02: ОБНОВЛЕНИЕ МАСТЕРА

**Команда Linux:** `git pull origin master`
**Команда Windows:** `git pull origin master`

**Инструкции:**
- Получаем последние изменения из удаленного репозитория

---

## Шаг 03: ПЕРЕХОД В СВОЮ ВЕТКУ

**Команда Linux:** `git checkout {{branchName}}`
**Команда Windows:** `git checkout {{branchName}}`

**Инструкции:**
- Переключаемся на свою рабочую ветку

---

## Шаг 04: СЛИЯНИЕ С МАСТЕРОМ

**Команда Linux:** `git merge master`
**Команда Windows:** `git merge master`

**Инструкции:**
- Вливаем изменения из мастера в свою ветку

---

## Шаг 05: ЗАПУСК В ПЕСОЧНИЦЕ

**Команда VSCode:** `npm run serve`
**Команда WebStorm:** `npm run dev`

**Инструкции VSCode:**
- Запускаем проект для тестирования в своей песочнице
- Используйте встроенный терминал VS Code

**Инструкции WebStorm:**
- Запускаем проект для тестирования в своей песочнице
- Используйте встроенный терминал WebStorm

---

## Шаг 06: НАСТРОЙКА КОНФИГУРАЦИИ

**Команда VSCode:** `code configuration.js`
**Команда WebStorm:** `webstorm configuration.js`

**Инструкции:**
- Раскомментируйте строки для sandbox в файле configuration.js
- Закомментируйте строки для предпрода
- Проверьте правильность ссылок, чтобы не затереть чужие папки

**Конфиг:** configuration.js
// Раскомментируйте эти строки для sandbox:
// main_app_url: "/",
// api_url: "/api/booster",

// Закомментируйте эти строки:
main_app_url: "http://78.142.221.162:3000",
api_url: "http://78.142.221.162:3000/api/booster",

---

## Шаг 07: СБОРКА ДЛЯ ТЕСТА

**Команда Linux:** `npm run build`
**Команда Windows:** `npm run build`

**Инструкции:**
- Собираем проект для деплоя в тестовую песочницу
- Адрес песочницы: `http://78.142.221.162:3000/test/{{username}}#`

---

## Шаг 08: ПРОВЕРКА НА ПРЕДПРОДЕ

**Действие:** [ОТКРЫТЬ ПРЕДПРОД](https://booster.rosatomtech.ru/)

**Инструкции:**
1. Проверьте работу на предпроде: **booster.rosatomtech.ru**
2. Если всё ОК, зовите "сверхлюдей" для проверки бэка и прода
3. После успешной проверки - деплой в прод

