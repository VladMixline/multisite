# Универсальный скрипт для автоматического commit и push
# Этот скрипт можно вызывать вручную или использовать в автоматизации

param(
    [string]$Message = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
)

$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Проверка наличия изменений
$status = git status --porcelain
if ($status) {
    Write-Host "[AUTO-COMMIT] Найдены изменения, создаю коммит..." -ForegroundColor Yellow
    
    # Получаем текущую ветку
    $branch = git branch --show-current
    
    if (-not $branch) {
        Write-Host "[AUTO-COMMIT] Ошибка: не удалось определить ветку" -ForegroundColor Red
        exit 1
    }
    
    # Добавление всех изменений
    git add .
    
    # Создание коммита
    $commitOutput = git commit -m $Message 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[AUTO-COMMIT] ✓ Коммит создан: $Message" -ForegroundColor Green
        Write-Host "[AUTO-COMMIT] Ветка: $branch" -ForegroundColor Cyan
        
        # Автоматический push
        Write-Host "[AUTO-PUSH] Отправляю изменения на GitHub..." -ForegroundColor Yellow
        $pushOutput = git push origin $branch 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[AUTO-PUSH] ✓ Изменения успешно отправлены на GitHub" -ForegroundColor Green
        } else {
            $errorMsg = $pushOutput -join "`n"
            if ($errorMsg -match "authentication|credential|username|password") {
                Write-Host "[AUTO-PUSH] ⚠ Требуется аутентификация GitHub" -ForegroundColor Yellow
                Write-Host "[AUTO-PUSH] Выполните: git push origin $branch" -ForegroundColor Yellow
                Write-Host "[AUTO-PUSH] При запросе введите ваш GitHub username и Personal Access Token" -ForegroundColor Yellow
            } elseif ($errorMsg -match "resolve host|network|connection") {
                Write-Host "[AUTO-PUSH] ⚠ Проблема с сетью. Коммит сохранен локально." -ForegroundColor Yellow
            } else {
                Write-Host "[AUTO-PUSH] ⚠ Push не выполнен. Коммит сохранен локально." -ForegroundColor Yellow
                Write-Host "[AUTO-PUSH] Ошибка: $errorMsg" -ForegroundColor Red
            }
        }
    } else {
        Write-Host "[AUTO-COMMIT] Ошибка при создании коммита" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "[AUTO-COMMIT] Нет изменений для коммита" -ForegroundColor Gray
}


