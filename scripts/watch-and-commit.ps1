# Скрипт для отслеживания изменений файлов и автоматического коммита
# Использует FileSystemWatcher для отслеживания изменений в реальном времени

$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$projectPath = $PSScriptRoot + "\.."
$debounceTime = 60 # секунд - время ожидания после последнего изменения перед коммитом
$timer = $null
$lastChangeTime = Get-Date

Write-Host "[WATCH-COMMIT] Запущен мониторинг изменений в: $projectPath" -ForegroundColor Cyan
Write-Host "[WATCH-COMMIT] Интервал перед коммитом после изменений: $debounceTime сек" -ForegroundColor Cyan

function Commit-Changes {
    param([string]$changeType, [string]$filePath)
    
    try {
        $status = git status --porcelain
        if ($status) {
            Write-Host "[WATCH-COMMIT] Изменения обнаружены ($changeType): $filePath" -ForegroundColor Yellow
            
            # Получаем текущую ветку
            $branch = git branch --show-current
            
            # Генерируем сообщение коммита
            $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
            $commitMessage = "Auto commit ($changeType): $timestamp - $filePath"
            
            # Добавление всех изменений
            git add .
            
            # Создание коммита
            $commitResult = git commit -m $commitMessage 2>&1
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "[WATCH-COMMIT] ✓ Коммит создан: $commitMessage" -ForegroundColor Green
                
                # Попытка push
                $pushOutput = git push origin $branch 2>&1
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "[WATCH-COMMIT] ✓ Изменения отправлены на GitHub" -ForegroundColor Green
                } else {
                    Write-Host "[WATCH-COMMIT] ⚠ Push не выполнен. Коммит сохранен локально." -ForegroundColor Yellow
                }
            }
        }
    } catch {
        Write-Host "[WATCH-COMMIT] Ошибка при коммите: $_" -ForegroundColor Red
    }
}

# Создаем FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $projectPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

# Исключаем папки, которые не нужно отслеживать
$watcher.Filter = "*.*"
$excludedDirs = @(".git", "node_modules", ".vite", "dist", "build")

# Обработчики событий
Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action {
    $path = $Event.SourceEventArgs.FullPath
    $name = $Event.SourceEventArgs.Name
    $changeType = $Event.SourceEventArgs.ChangeType
    
    # Проверяем, не находится ли файл в исключенных директориях
    $shouldExclude = $false
    foreach ($excludedDir in $excludedDirs) {
        if ($path -like "*\$excludedDir\*") {
            $shouldExclude = $true
            break
        }
    }
    
    if (-not $shouldExclude) {
        $script:lastChangeTime = Get-Date
        
        # Отменяем предыдущий таймер
        if ($script:timer) {
            Stop-Job $script:timer -ErrorAction SilentlyContinue
            Remove-Job $script:timer -ErrorAction SilentlyContinue
        }
        
        # Создаем новый таймер для отложенного коммита
        $script:timer = Start-Job -ScriptBlock {
            param($debounceSec, $changeType, $filePath)
            Start-Sleep -Seconds $debounceSec
            & "$using:PSScriptRoot\commit-and-push.ps1"
        } -ArgumentList $debounceTime, $changeType, $name
        
        Write-Host "[WATCH-COMMIT] Обнаружено изменение: $name ($changeType)" -ForegroundColor Gray
    }
}

# Запускаем также периодическую проверку на случай пропущенных событий
$periodicCheck = Start-Job -ScriptBlock {
    while ($true) {
        Start-Sleep -Seconds 30
        & "$using:PSScriptRoot\commit-and-push.ps1"
    }
}

Write-Host "[WATCH-COMMIT] Мониторинг запущен. Нажмите Ctrl+C для остановки." -ForegroundColor Green

try {
    # Ожидаем бесконечно
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    # Очистка при остановке
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    if ($timer) {
        Stop-Job $timer -ErrorAction SilentlyContinue
        Remove-Job $timer -ErrorAction SilentlyContinue
    }
    Stop-Job $periodicCheck -ErrorAction SilentlyContinue
    Remove-Job $periodicCheck -ErrorAction SilentlyContinue
    Write-Host "[WATCH-COMMIT] Мониторинг остановлен." -ForegroundColor Yellow
}

