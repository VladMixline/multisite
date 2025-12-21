# Скрипт для настройки частых автоматических коммитов
# Запускает фоновый процесс для мониторинга изменений

$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$frequentCommitScript = Join-Path $scriptPath "auto-commit-frequent.ps1"

Write-Host "Настройка частых автоматических коммитов..." -ForegroundColor Cyan

# Проверяем, не запущен ли уже процесс
$existingProcess = Get-Process | Where-Object { 
    $_.ProcessName -eq "powershell" -and 
    $_.CommandLine -like "*auto-commit-frequent*" 
}

if ($existingProcess) {
    Write-Host "Процесс частых коммитов уже запущен (PID: $($existingProcess.Id))" -ForegroundColor Yellow
    Write-Host "Остановите его перед повторным запуском." -ForegroundColor Yellow
    exit
}

# Запускаем скрипт в фоновом режиме
Write-Host "Запуск скрипта мониторинга изменений..." -ForegroundColor Green
Start-Process powershell.exe -ArgumentList "-NoExit", "-File", "`"$frequentCommitScript`"" -WindowStyle Minimized

Write-Host "✓ Скрипт запущен в фоновом режиме" -ForegroundColor Green
Write-Host "Коммиты будут создаваться автоматически каждые 60 секунд при наличии изменений" -ForegroundColor Cyan
Write-Host "Для остановки закройте окно PowerShell или найдите процесс и завершите его" -ForegroundColor Yellow


