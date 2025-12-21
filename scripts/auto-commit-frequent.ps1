# Скрипт для более частого автоматического коммита
# Проверяет изменения каждые 30 секунд и делает коммит

$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$checkInterval = 30 # секунд между проверками
$lastCommitTime = Get-Date
$minTimeBetweenCommits = 60 # минимальное время между коммитами (секунды)

Write-Host "[FREQUENT-AUTO-COMMIT] Запущен мониторинг изменений (интервал: $checkInterval сек)" -ForegroundColor Cyan
Write-Host "[FREQUENT-AUTO-COMMIT] Минимальный интервал между коммитами: $minTimeBetweenCommits сек" -ForegroundColor Cyan

while ($true) {
    try {
        # Проверка наличия изменений
        $status = git status --porcelain
        if ($status) {
            $timeSinceLastCommit = ((Get-Date) - $lastCommitTime).TotalSeconds
            
            if ($timeSinceLastCommit -ge $minTimeBetweenCommits) {
                Write-Host "[FREQUENT-AUTO-COMMIT] Найдены изменения, создаю коммит..." -ForegroundColor Yellow
                
                # Получаем текущую ветку
                $branch = git branch --show-current
                
                # Определяем тип изменений для сообщения коммита
                $changes = git diff --name-only --cached
                if (-not $changes) {
                    $changes = git diff --name-only
                }
                
                $fileList = $changes -join ", "
                if ($fileList.Length -gt 100) {
                    $fileList = $fileList.Substring(0, 100) + "..."
                }
                
                $commitMessage = "Auto commit: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - $fileList"
                
                # Добавление всех изменений
                git add .
                
                # Создание коммита
                $commitResult = git commit -m $commitMessage 2>&1
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[FREQUENT-AUTO-COMMIT] ✓ Коммит создан: $commitMessage" -ForegroundColor Green
                    Write-Host "[FREQUENT-AUTO-COMMIT] Ветка: $branch" -ForegroundColor Cyan
                    $lastCommitTime = Get-Date
                    
                    # Попытка push
                    $pushOutput = git push origin $branch 2>&1
                    if ($LASTEXITCODE -eq 0) {
                        Write-Host "[FREQUENT-AUTO-COMMIT] ✓ Изменения отправлены на GitHub" -ForegroundColor Green
                    } else {
                        Write-Host "[FREQUENT-AUTO-COMMIT] ⚠ Push не выполнен (требуется аутентификация). Коммит сохранен локально." -ForegroundColor Yellow
                    }
                } else {
                    Write-Host "[FREQUENT-AUTO-COMMIT] ⚠ Ошибка при создании коммита: $commitResult" -ForegroundColor Red
                }
            } else {
                $remaining = [math]::Round($minTimeBetweenCommits - $timeSinceLastCommit)
                Write-Host "[FREQUENT-AUTO-COMMIT] Изменения найдены, но прошло только $([math]::Round($timeSinceLastCommit)) сек. Жду еще $remaining сек..." -ForegroundColor Gray
            }
        }
    } catch {
        Write-Host "[FREQUENT-AUTO-COMMIT] Ошибка: $_" -ForegroundColor Red
    }
    
    Start-Sleep -Seconds $checkInterval
}


