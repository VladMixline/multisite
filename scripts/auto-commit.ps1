# Автоматический коммит изменений
# Использование: .\scripts\auto-commit.ps1 "Описание изменений"

param(
    [string]$Message = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Проверка наличия изменений
$status = git status --porcelain
if ($status) {
    Write-Host "Найдены изменения, создаю коммит..." -ForegroundColor Yellow
    
    # Добавление всех изменений
    git add .
    
    # Создание коммита
    git commit -m $Message
    
    Write-Host "✓ Коммит создан: $Message" -ForegroundColor Green
    Write-Host "Текущая ветка: $(git branch --show-current)" -ForegroundColor Cyan
} else {
    Write-Host "Нет изменений для коммита" -ForegroundColor Gray
}

