# Скрипт для автоматического коммита изменений

param(
    [string]$Message = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

# Проверка наличия изменений
$status = git status --porcelain
if ($status) {
    Write-Host "Найдены изменения, создаю коммит..." -ForegroundColor Yellow
    
    # Добавление всех изменений
    git add .
    
    # Создание коммита
    git commit -m $Message
    
    Write-Host "Коммит создан: $Message" -ForegroundColor Green
} else {
    Write-Host "Нет изменений для коммита" -ForegroundColor Gray
}


