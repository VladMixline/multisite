# Автоматический коммит и push после изменений
# Эта функция вызывается автоматически после каждого изменения

function Commit-AndPush {
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
        
        # Добавление всех изменений
        git add .
        
        # Создание коммита
        git commit -m $Message 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "[AUTO-COMMIT] ✓ Коммит создан: $Message" -ForegroundColor Green
            Write-Host "[AUTO-COMMIT] Ветка: $branch" -ForegroundColor Cyan
            
            # Попытка push
            $pushOutput = git push origin $branch 2>&1
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[AUTO-COMMIT] ✓ Изменения отправлены на GitHub" -ForegroundColor Green
            } else {
                Write-Host "[AUTO-COMMIT] ⚠ Push не выполнен (требуется аутентификация). Коммит сохранен локально." -ForegroundColor Yellow
            }
        }
    }
}

# Экспорт функции для использования в других скриптах
Export-ModuleMember -Function Commit-AndPush





