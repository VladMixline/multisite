# Сайт: Теория трансляции

Проект сайта (React + Vite) и вспомогательного backend (Node.js/Express).

## Структура проекта

```
webproj/
├── frontend/          # React + Vite приложение
├── backend/           # Node.js Express сервер
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

## Деплой (Vercel)

В репозитории есть `vercel.json`, который указывает `outputDirectory: frontend/dist` и добавляет SPA-rewrite для React Router.

