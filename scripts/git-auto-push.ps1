# Автоматический коммит и push с использованием токена
# Использование: .\scripts\git-auto-push.ps1 "Описание изменений"

param(
    [string]$Message = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Проверка наличия изменений
$status = git status --porcelain
if ($status) {
    Write-Host "Найдены изменения, создаю коммит..." -ForegroundColor Yellow
    
    # Получаем текущую ветку
    $branch = git branch --show-current
    
    # Добавление всех изменений
    git add .
    
    # Создание коммита
    git commit -m $Message
    
    Write-Host "✓ Коммит создан: $Message" -ForegroundColor Green
    Write-Host "Текущая ветка: $branch" -ForegroundColor Cyan
    
    # Push в remote
    Write-Host "Отправляю изменения на GitHub..." -ForegroundColor Yellow
    
    # Пытаемся сделать push
    $pushResult = git push origin $branch 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Изменения отправлены на GitHub" -ForegroundColor Green
    } else {
        Write-Host "⚠ Ошибка при отправке на GitHub. Возможно требуется аутентификация." -ForegroundColor Yellow
        Write-Host "Коммит создан локально. Выполните вручную: git push origin $branch" -ForegroundColor Yellow
    }
} else {
    Write-Host "Нет изменений для коммита" -ForegroundColor Gray
}

