export const sshConfig = {
    title: 'НАСТРОЙКА SSH',
    subtitle: 'Безопасный доступ к репозиторию',
    activeTab: 'linux',
    tabs: [
        {id: 'linux', label: 'LINUX', icon: 'simple-icons:linux'},
        {id: 'windows', label: 'WINDOWS', icon: 'simple-icons:windows'}
    ],
    settings: [
        {
            id: 'username',
            label: 'Имя пользователя (Windows)',
            placeholder: 'папка user',
            type: 'text',
            autocomplete: 'username',
            defaultValue: ''
        },
        {
            id: 'keyName',
            label: 'Имя ключа',
            placeholder: 'имя ключа',
            type: 'text',
            autocomplete: 'off',
            defaultValue: 'id_rsa_tar'
        },
        {
            id: 'hostName',
            label: 'Имя хоста',
            placeholder: 'алиас хоста',
            type: 'text',
            autocomplete: 'off',
            defaultValue: 'git'
        }
    ],
    steps: [
        {
            number: '01',
            title: 'СОЗДАНИЕ SSH КЛЮЧЕЙ',
            type: 'command',
            command: 'ssh-keygen',
            instructions: [
                {text: 'Введите имя файла: ', code: 'id_rsa_tar'},
                {text: 'Нажмите Enter для пустого пароля'}
            ]
        },
        {
            number: '02',
            title: 'НАСТРОЙКА SSH КОНФИГА',
            type: 'command',
            command: (activeTab, settingsData) => {
                if (activeTab === 'windows') {
                    const userProfile = settingsData.username || '%USERPROFILE%'
                    return `notepad ${userProfile}\\.ssh\\config`
                } else {
                    return 'nano ~/.ssh/config'
                }
            },
            commandLabel: 'СОЗДАТЬ ФАЙЛ',
            instructions: [
                'Добавьте эту конфигурацию в файл:',
                '<strong>Настройка:</strong>'
            ],
            configContent: (activeTab, settingsData) => {
                const keyPath = activeTab === 'windows'
                    ? `%USERPROFILE%\\.ssh\\${settingsData.keyName}`
                    : `~/.ssh/${settingsData.keyName}`

                return `Host ${settingsData.hostName}
    HostName git.rosatomtech.ru
    User git
    Port 10022
    IdentityFile ${keyPath}
    IdentitiesOnly yes`
            },
            configList: [
                {text: ' - выберите любое имя (например, "МойГит", "Работа")', code: 'Host'},
                {text: ' - путь к вашему приватному ключу', code: 'IdentityFile'},
                {text: 'Сохраните файл и проверьте: ', code: 'ssh -T Tar_Git'}
            ]
        },
        {
            number: '03',
            title: 'ИЗВЛЕЧЕНИЕ ПУБЛИЧНОГО КЛЮЧА',
            type: 'command',
            command: (activeTab, settingsData) => {
                if (activeTab === 'windows') {
                    const userProfile = settingsData.username || '%USERPROFILE%'
                    return `type ${userProfile}\\.ssh\\${settingsData.keyName}.pub`
                } else {
                    return `cat ~/.ssh/${settingsData.keyName}.pub`
                }
            },
            instructions: [
                'Скопируйте весь вывод от <span class="code">ssh-rsa</span> до конца'
            ]
        },
        {
            number: '04',
            title: 'ДОБАВЛЕНИЕ В GOGS',
            type: 'button',
            buttonText: 'ОТКРЫТЬ GOGS',
            buttonIcon: 'material-symbols:open-in-new',
            buttonAction: 'openGogs',
            instructions: [
                '1. Перейдите в <strong>Настройки</strong> → <strong>SSH Keys</strong>',
                '2. Нажмите <strong>Добавить ключ</strong>',
                '3. Вставьте скопированный ключ'
            ]
        },
        {
            number: '05',
            title: 'ПРОВЕРКА ПОДКЛЮЧЕНИЯ',
            type: 'command',
            command: 'ssh -T git@git.rosatomtech.ru -p 10022',
            instructions: [
                'Ожидаемый результат: <span class="code">Hi there, You\'ve successfully authenticated...</span>'
            ]
        },
        {
            number: '06',
            title: 'ПЕРЕКЛЮЧЕНИЕ НА SSH',
            type: 'command',
            command: 'git remote set-url origin git@git.rosatomtech.ru:username/repository.git',
            instructions: [
                'Замените <span class="code">username/repository</span> на ваш репозиторий',
                'Затем выполните: <span class="code">git pull</span> и <span class="code">git push</span>'
            ]
        }
    ],
    advancedCommands: [
        {command: 'ssh-add -l', description: 'Список загруженных ключей'},
        {command: 'ssh-add ~/.ssh/id_rsa_tar', description: 'Добавить ключ в агент'},
        {command: 'git remote -v', description: 'Проверить текущий remote'}
    ]
}
