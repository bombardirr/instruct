---
id: 'npm-package-manager'
title: 'РАБОТА С NPM'
menuId: 'NPM'
menuIcon: 'simple-icons:npm'
menuText: 'NPM'
subtitle: 'Управление зависимостями и скриптами проекта'
order: 4
icon: 'simple-icons:npm'
activeTab: 'install'
tabs:
  - id: 'install'
    label: 'УСТАНОВКА'
    icon: 'simple-icons:npm'
  - id: 'scripts'
    label: 'СКРИПТЫ'
    icon: 'simple-icons:npm'
settings:
  - id: 'packageName'
    label: 'Название пакета'
    placeholder: 'vue'
    type: 'text'
    autocomplete: 'off'
    defaultValue: ''
    visibleFor: ['install', 'scripts']
  - id: 'version'
    label: 'Версия пакета'
    placeholder: '^3.0.0'
    type: 'text'
    autocomplete: 'off'
    defaultValue: 'latest'
    visibleFor: ['install', 'scripts']
---

## Шаг 01: ИНИЦИАЛИЗАЦИЯ ПРОЕКТА

**Команда Install:** `npm init`
**Команда Scripts:** `npm init -y`

**Инструкции Install:**
- Создает файл package.json
- Интерактивный режим с вопросами
- Настройте проект вручную

**Инструкции Scripts:**
- Создает файл package.json
- Автоматический режим с значениями по умолчанию
- Быстрая инициализация

---

## Шаг 02: УСТАНОВКА ЗАВИСИМОСТЕЙ

**Команда Install:** `npm install {{packageName}}@{{version}}`
**Команда Scripts:** `npm install -D {{packageName}}`

**Инструкции Install:**
- Устанавливает пакет в проект
- Для dev-зависимости: `npm install -D {{packageName}}`
- Для глобальной установки: `npm install -g {{packageName}}`

**Инструкции Scripts:**
- Устанавливает пакет как dev-зависимость
- Пакет доступен только в режиме разработки
- Экономит место в продакшн сборке

---

## Шаг 03: УСТАНОВКА ВСЕХ ЗАВИСИМОСТЕЙ

**Команда Install:** `npm install`
**Команда Scripts:** `npm ci`

**Инструкции:**
- Устанавливает все зависимости из package.json
- Используйте после клонирования проекта

---

## Шаг 04: ЗАПУСК СКРИПТОВ

**Команда Install:** `npm run start`
**Команда Scripts:** `npm run dev`

**Инструкции:**
- Запускает скрипт из package.json
- Популярные скрипты: `start`, `build`, `test`, `dev`

---

## Шаг 05: ОБНОВЛЕНИЕ ПАКЕТОВ

**Команда Install:** `npm update`
**Команда Scripts:** `npm outdated`

**Инструкции:**
- Обновляет все пакеты до последних версий
- Проверяет совместимость с package.json

---

## Шаг 06: УДАЛЕНИЕ ПАКЕТОВ

**Команда Install:** `npm uninstall {{packageName}}`
**Команда Scripts:** `npm prune`

**Инструкции:**
- Удаляет пакет из проекта
- Автоматически обновляет package.json

