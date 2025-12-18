# React + Vite + Node.js Project

Проект с React фронтендом (Vite) и Node.js бэкендом.

## Git Repository

Репозиторий подключен к: https://github.com/VladMixline/multisite.git

### Ветки проекта

- `main` - основная ветка (production)
- `develop` - ветка разработки
- `feature/ui-components` - ветка для разработки UI компонентов

### Работа с коммитами

Для автоматического коммита изменений используйте:

```bash
.\scripts\auto-commit.ps1 "Описание изменений"
```

Или вручную:

```bash
git add .
git commit -m "Описание изменений"
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

