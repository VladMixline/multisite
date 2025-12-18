# React + Vite + Node.js Project

Проект с React фронтендом (Vite) и Node.js бэкендом.

## Git Repository

Репозиторий подключен к: https://github.com/VladMixline/multisite.git

### Ветки проекта

- `main` - основная ветка (production)
- `develop` - ветка разработки
- `feature/ui-components` - ветка для разработки UI компонентов

### Автоматические коммиты и push

**Система автоматических коммитов настроена!**

После каждого изменения файлов используйте:

```bash
npm run commit "Описание изменений"
```

Или напрямую:

```powershell
.\scripts\auto-commit-push.ps1 "Описание изменений"
```

Этот скрипт автоматически:
1. Добавит все изменения
2. Создаст коммит
3. Отправит изменения на GitHub (push)

**Git Hook настроен:** После каждого коммита автоматически выполняется попытка push.

### Ручной коммит

```bash
git add .
git commit -m "Описание изменений"
git push origin main
```

## Структура проекта

```
webproj/
├── frontend/          # React + Vite приложение
├── backend/           # Node.js Express сервер
├── scripts/           # Вспомогательные скрипты
└── package.json       # Корневой package.json для управления всем проектом
```

## Установка

Установите все зависимости одной командой:

```bash
npm run install:all
```

Или установите по отдельности:

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

## Запуск

### Запуск всего проекта (frontend + backend)

```bash
npm run dev
```

### Запуск отдельно

**Frontend:**
```bash
npm run dev:frontend
```
Откроется на http://localhost:3000

**Backend:**
```bash
npm run dev:backend
```
Запустится на http://localhost:5000

## Сборка

```bash
npm run build
```

Собранные файлы будут в `frontend/dist/`

