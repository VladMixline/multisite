# PowerShell скрипт для настройки Git репозитория

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

Write-Host "Git репозиторий настроен!" -ForegroundColor Green
Write-Host "Ветки созданы: main, develop, feature/ui-components" -ForegroundColor Green

