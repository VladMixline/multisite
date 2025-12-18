# Git Workflow

## Ветки проекта

1. **main** - основная ветка для production
2. **develop** - ветка для разработки
3. **feature/ui-components** - ветка для разработки UI компонентов

## Работа с ветками

### Переключение между ветками

```bash
git checkout main
git checkout develop
git checkout feature/ui-components
```

### Создание новой ветки

```bash
git checkout -b feature/new-feature
```

## Коммиты

### Автоматический коммит

Используйте скрипт для автоматического коммита всех изменений:

```powershell
.\scripts\auto-commit.ps1 "Описание изменений"
```

### Ручной коммит

```bash
git add .
git commit -m "Описание изменений"
```

## Синхронизация с GitHub

### Отправка изменений

```bash
git push origin main
git push origin develop
git push origin feature/ui-components
```

### Получение изменений

```bash
git pull origin main
```

## Политика коммитов

- Делайте коммиты после каждого логического изменения
- Используйте понятные сообщения коммитов
- Коммитьте часто, небольшими порциями

