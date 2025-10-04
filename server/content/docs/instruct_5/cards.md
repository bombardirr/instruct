---
id: 'vue-development'
title: 'РАЗРАБОТКА НА VUE'
subtitle: 'Основы работы с Vue.js фреймворком'
order: 5
icon: 'simple-icons:vuedotjs'
activeTab: 'components'
tabs:
  - id: 'components'
    label: 'КОМПОНЕНТЫ'
    icon: 'simple-icons:vuedotjs'
  - id: 'composition'
    label: 'COMPOSITION API'
    icon: 'simple-icons:vuedotjs'
settings:
  - id: 'componentName'
    label: 'Название компонента'
    placeholder: 'MyComponent'
    type: 'text'
    autocomplete: 'off'
    defaultValue: ''
    visibleFor: ['components', 'composition']
---

## Шаг 01: СОЗДАНИЕ КОМПОНЕНТА

**Команда Components:** `touch {{componentName}}.vue`
**Команда Composition:** `mkdir {{componentName}} && touch {{componentName}}/index.vue`

**Инструкции Components:**
- Создает новый Vue компонент
- Используйте PascalCase для названий
- Один файл для всего компонента

**Инструкции Composition:**
- Создает новый Vue компонент
- Используйте PascalCase для названий
- Отдельная папка для компонента

---

## Шаг 02: СТРУКТУРА КОМПОНЕНТА

**Инструкции:**
- Создает новый Vue компонент
- Используйте PascalCase для названий
- Структура: template, script, style
- Template содержит HTML разметку
- Script setup для логики компонента
- Style scoped для стилей компонента

---

## Шаг 03: ИСПОЛЬЗОВАНИЕ COMPOSITION API

**Инструкции:**
- Импортируйте нужные функции из Vue
- Используйте ref для реактивных данных
- computed для вычисляемых свойств
- onMounted для хуков жизненного цикла
- Все функции доступны в script setup

---

## Шаг 04: РАБОТА С ПРОПСАМИ

**Инструкции:**
- Передавайте данные через props
- Используйте defineProps для объявления
- Указывайте типы данных
- Доступ через props.propertyName
- Родитель передает данные через атрибуты

---

## Шаг 05: ОБРАБОТКА СОБЫТИЙ

**Инструкции:**
- Используйте @click для обработки кликов
- defineEmits для объявления событий
- emit() для отправки событий родителю
- Передавайте данные через параметры
- События позволяют компонентам общаться

---

## Шаг 06: РАБОТА С РОУТИНГОМ

**Команда Components:** `npm install vue-router@4`
**Команда Composition:** `npm install vue-router@4 @vue/composition-api`

**Инструкции:**
- Устанавливает Vue Router для навигации
- Создавайте маршруты в отдельном файле
- Используйте router-link для навигации
- router-view для отображения компонентов

