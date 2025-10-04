---
id: 'git-workflow'
title: 'РАБОТА С GIT'
subtitle: 'Основы работы с системой контроля версий'
order: 3
icon: 'simple-icons:git'
activeTab: 'basic'
tabs:
  - id: 'basic'
    label: 'ОСНОВЫ'
    icon: 'simple-icons:git'
  - id: 'advanced'
    label: 'ПРОДВИНУТЫЕ'
    icon: 'simple-icons:git'
settings:
  - id: 'repository'
    label: 'URL репозитория'
    placeholder: 'https://git.rosatomtech.ru/user/repo.git'
    type: 'text'
    autocomplete: 'off'
    defaultValue: ''
    visibleFor: ['basic', 'advanced']
  - id: 'branchName'
    label: 'Название ветки'
    placeholder: 'feature/new-feature'
    type: 'text'
    autocomplete: 'off'
    defaultValue: 'feature/new-feature'
    visibleFor: ['basic', 'advanced']
---

## Шаг 01: КЛОНИРОВАНИЕ РЕПОЗИТОРИЯ

**Команда Basic:** `git clone {{repository}}`
**Команда Advanced:** `git clone --depth 1 {{repository}}`

**Инструкции Basic:**
- Создает локальную копию удаленного репозитория
- Перейдите в папку проекта: `cd project-name`
- Простой способ клонирования

**Инструкции Advanced:**
- Создает локальную копию удаленного репозитория
- Перейдите в папку проекта: `cd project-name`
- Поверхностное клонирование для экономии места

---

## Шаг 02: ПРОВЕРКА СТАТУСА

**Команда Basic:** `git status`
**Команда Advanced:** `git status --porcelain`

**Инструкции Basic:**
- Показывает текущее состояние рабочей директории
- Отображает измененные, добавленные и удаленные файлы
- Подробный вывод с описаниями

**Инструкции Advanced:**
- Показывает текущее состояние рабочей директории
- Отображает измененные, добавленные и удаленные файлы
- Компактный формат для скриптов

---

## Шаг 03: ДОБАВЛЕНИЕ ФАЙЛОВ

**Команда Basic:** `git add .`
**Команда Advanced:** `git add -A`

**Инструкции:**
- Добавляет все изменения в индекс
- Для конкретного файла: `git add filename`

---

## Шаг 04: СОЗДАНИЕ КОММИТА

**Команда Basic:** `git commit -m "Описание изменений"`
**Команда Advanced:** `git commit -m "feat: добавить новую функцию"`

**Инструкции:**
- Создает коммит с описанием изменений
- Используйте понятные и краткие сообщения

---

## Шаг 05: ОТПРАВКА ИЗМЕНЕНИЙ

**Команда Basic:** `git push origin {{branchName}}`
**Команда Advanced:** `git push -u origin {{branchName}}`

**Инструкции:**
- Отправляет локальные коммиты в удаленный репозиторий
- При первом push: `git push -u origin {{branchName}}`

---

## Шаг 06: ПОЛУЧЕНИЕ ИЗМЕНЕНИЙ

**Команда Basic:** `git pull origin master`
**Команда Advanced:** `git pull --rebase origin master`

**Инструкции:**
- Получает и объединяет изменения из удаленного репозитория
- Всегда делайте pull перед началом работы

