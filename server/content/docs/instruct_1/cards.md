---
id: 'ssh-setup'
title: 'НАСТРОЙКА SSH'
subtitle: 'Безопасный доступ к репозиторию'
order: 1
icon: 'simple-icons:linux'
activeTab: 'linux'
tabs:
  - id: 'linux'
    label: 'LINUX'
    icon: 'simple-icons:linux'
  - id: 'windows'
    label: 'WINDOWS'
    icon: 'simple-icons:windows'
settings:
  - id: 'windowsUsername'
    label: 'Имя пользователя (Windows)'
    placeholder: 'папка user'
    type: 'text'
    autocomplete: 'username'
    defaultValue: ''
    visibleFor: ['windows']
  - id: 'keyName'
    label: 'Имя ключа'
    placeholder: 'имя ключа'
    type: 'text'
    autocomplete: 'off'
    defaultValue: 'id_rsa_tar'
    visibleFor: ['linux', 'windows']
  - id: 'hostName'
    label: 'Имя хоста'
    placeholder: 'алиас хоста'
    type: 'text'
    autocomplete: 'off'
    defaultValue: 'git'
    visibleFor: ['linux', 'windows']
---

## Шаг 01: СОЗДАНИЕ SSH КЛЮЧЕЙ

**Команда Linux:** `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
**Команда Windows:** `ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`

**Инструкции Linux:**
- Введите имя файла: `id_rsa_tar`
- Нажмите Enter для пустого пароля
- Используйте терминал Linux

**Инструкции Windows:**
- Введите имя файла: `id_rsa_tar`
- Нажмите Enter для пустого пароля
- Используйте PowerShell или CMD

---

## Шаг 02: НАСТРОЙКА SSH КОНФИГА

**Команда Linux:** `nano ~/.ssh/config`
**Команда Windows:** `notepad {{USERPROFILE}}\.ssh\config`

**Инструкции Linux:**
- Добавьте эту конфигурацию в файл
- Host - выберите любое имя (например, "МойГит", "Работа")
- IdentityFile - путь к вашему приватному ключу
- Сохраните файл и проверьте: `ssh -T {{hostName}}`

**Инструкции Windows:**
- Добавьте эту конфигурацию в файл
- Host - выберите любое имя (например, "МойГит", "Работа")
- IdentityFile - путь к вашему приватному ключу
- Сохраните файл и проверьте: `ssh -T {{hostName}}`

**Конфиг:** config
Host {{hostName}}
    HostName git.rosatomtech.ru
    User git
    Port 10022
    IdentityFile {{keyPath}}
    IdentitiesOnly yes

---

## Шаг 03: ИЗВЛЕЧЕНИЕ ПУБЛИЧНОГО КЛЮЧА

**Команда Linux:** `cat ~/.ssh/{{keyName}}.pub`
**Команда Windows:** `type {{USERPROFILE}}\.ssh\{{keyName}}.pub`

**Инструкции:**
- Скопируйте весь вывод от `ssh-rsa` до конца

---

## Шаг 04: ДОБАВЛЕНИЕ В GOGS

**Действие:** [ОТКРЫТЬ GOGS](https://git.rosatomtech.ru/)

**Инструкции:**
1. Перейдите в **Настройки** → **SSH Keys**
2. Нажмите **Добавить ключ**
3. Вставьте скопированный ключ

---

## Шаг 05: ПРОВЕРКА ПОДКЛЮЧЕНИЯ

**Команда Linux:** `ssh -T git@git.rosatomtech.ru -p 10022`
**Команда Windows:** `ssh -T git@git.rosatomtech.ru -p 10022`

**Инструкции:**
- Ожидаемый результат: `Hi there, You've successfully authenticated...`

---

## Шаг 06: ПЕРЕКЛЮЧЕНИЕ НА SSH

**Команда Linux:** `git remote set-url origin git@git.rosatomtech.ru:username/repository.git`
**Команда Windows:** `git remote set-url origin git@git.rosatomtech.ru:username/repository.git`

**Инструкции:**
- Замените `username/repository` на ваш репозиторий
- Затем выполните: `git pull` и `git push`