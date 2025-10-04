---
id: 'deployment'
title: 'ДЕПЛОЙ ПРОЕКТА'
subtitle: 'Развертывание приложения в продакшн'
order: 6
icon: 'simple-icons:docker'
activeTab: 'build'
tabs:
  - id: 'build'
    label: 'СБОРКА'
    icon: 'simple-icons:docker'
  - id: 'deploy'
    label: 'ДЕПЛОЙ'
    icon: 'simple-icons:docker'
settings:
  - id: 'projectName'
    label: 'Название проекта'
    placeholder: 'my-app'
    type: 'text'
    autocomplete: 'off'
    defaultValue: ''
    visibleFor: ['build', 'deploy']
---

## Шаг 01: ПОДГОТОВКА К СБОРКЕ

**Команда Build:** `npm run build`
**Команда Deploy:** `npm run build:prod`

**Инструкции Build:**
- Создает оптимизированную версию для продакшна
- Проверьте, что все тесты проходят: `npm test`
- Стандартная сборка для разработки

**Инструкции Deploy:**
- Создает оптимизированную версию для продакшна
- Проверьте, что все тесты проходят: `npm test`
- Продакшн сборка с дополнительными оптимизациями

---

## Шаг 02: ПРОВЕРКА СБОРКИ

**Команда Build:** `npm run preview`
**Команда Deploy:** `npm run serve`

**Инструкции Build:**
- Запускает локальный сервер для проверки сборки
- Убедитесь, что все работает корректно
- Предварительный просмотр сборки

**Инструкции Deploy:**
- Запускает локальный сервер для проверки сборки
- Убедитесь, что все работает корректно
- Продакшн сервер для тестирования

---

## Шаг 03: НАСТРОЙКА ОКРУЖЕНИЯ

**Инструкции:**
- Настройте переменные окружения для продакшна
- Проверьте все URL и API endpoints

**Конфиг:** .env.production
NODE_ENV=production
VITE_API_URL=https://api.example.com
VITE_APP_TITLE={{projectName}}

---

## Шаг 04: СОЗДАНИЕ DOCKERFILE

**Инструкции:**
- Создайте Dockerfile в корне проекта
- Настройте базовый образ и команды

**Конфиг:** Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 3000
CMD ["npm", "run", "preview"]

---

## Шаг 05: СБОРКА DOCKER ОБРАЗА

**Команда Build:** `docker build -t {{projectName}} .`
**Команда Deploy:** `docker build --no-cache -t {{projectName}}:latest .`

**Инструкции:**
- Создает Docker образ приложения
- Проверьте размер образа: `docker images`

---

## Шаг 06: ЗАПУСК КОНТЕЙНЕРА

**Команда Build:** `docker run -p 3000:3000 {{projectName}}`
**Команда Deploy:** `docker run -d -p 80:3000 --name {{projectName}} {{projectName}}`

**Инструкции:**
- Запускает приложение в контейнере
- Проверьте доступность: `http://localhost:3000`

---

## Шаг 07: ДЕПЛОЙ НА СЕРВЕР

**Команда Build:** `docker push registry/{{projectName}}`
**Команда Deploy:** `docker-compose up -d`

**Инструкции:**
- Отправляет образ в реестр
- Настройте CI/CD для автоматического деплоя

