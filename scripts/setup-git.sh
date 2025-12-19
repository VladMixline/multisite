#!/bin/bash
# Скрипт для настройки Git репозитория

# Инициализация репозитория
git init

# Добавление remote
git remote add origin https://github.com/VladMixline/multisite.git

# Создание основных веток
git checkout -b main
git checkout -b develop
git checkout -b feature/ui-components

# Возврат на main
git checkout main

echo "Git репозиторий настроен!"
echo "Ветки созданы: main, develop, feature/ui-components"





