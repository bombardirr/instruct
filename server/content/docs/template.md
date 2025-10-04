---
id: 'template'
title: 'ШАБЛОН КАРТОЧКИ'
subtitle: 'Пример структуры для всех карточек'
order: 0
icon: 'simple-icons:template'
activeTab: 'linux'
tabs:
  - id: 'linux'
    label: 'LINUX'
    icon: 'simple-icons:linux'
  - id: 'windows'
    label: 'WINDOWS'
    icon: 'simple-icons:windows'
settings:
  - id: 'exampleSetting'
    label: 'Пример настройки'
    placeholder: 'значение'
    type: 'text'
    autocomplete: 'off'
    defaultValue: ''
---

## Шаг 01: ПРИМЕР УНИВЕРСАЛЬНОЙ КОМАНДЫ

**Команда:** `command-name`

**Инструкции:**
- Выполните команду для выполнения действия
- Используйте параметры при необходимости
- Проверьте результат выполнения

---

## Шаг 02: ПРИМЕР АЛЬТЕРНАТИВНЫХ КОМАНД

**Команда Linux:** `linux-command`
**Команда Windows:** `windows-command`
**Команда VSCode:** `vscode-command`
**Команда WebStorm:** `webstorm-command`

**Инструкции:**
- Выберите команду для вашей среды
- Выполните соответствующую команду
- Проверьте результат

**Конфиг:** config-name
# Пример конфигурации
setting1 = value1
setting2 = value2
setting3 = {{exampleSetting}}

---

## Шаг 03: ПРИМЕР КНОПКИ

**Действие:** [ОТКРЫТЬ САЙТ](https://example.com)

**Инструкции:**
- Нажмите кнопку для перехода на сайт
- Откроется новая вкладка браузера
- Проверьте доступность ресурса

---

## Шаг 04: ПРИМЕР ИНФОРМАЦИИ

**Инструкции:**
- Это информационный шаг
- Содержит только инструкции
- Не требует выполнения команд

**Конфиг:** settings.conf
# Пример конфигурации
setting1 = value1
setting2 = value2
setting3 = {{exampleSetting}}

---

## Шаг 05: ПРИМЕР ТОЛЬКО С ИНСТРУКЦИЯМИ

**Инструкции:**
- Простой шаг с инструкциями
- Без команд и конфигов
- Только текстовое описание

---

## Шаг 06: ПРИМЕР ТОЛЬКО С КОНФИГОМ

**Конфиг:** config.json
{
  "name": "example",
  "version": "1.0.0",
  "settings": {
    "key": "{{exampleSetting}}",
    "value": "example"
  }
}
