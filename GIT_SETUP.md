# Настройка автоматического Push на GitHub

Для автоматического push на GitHub требуется настроить аутентификацию один раз.

## Вариант 1: Использование Personal Access Token (PAT)

1. Создайте Personal Access Token на GitHub:
   - Перейдите в Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Создайте новый токен с правами `repo`
   - Скопируйте токен

2. При первом push введите:
   - Username: ваш GitHub username (VladMixline)
   - Password: вставьте токен вместо пароля

3. Git Credential Manager сохранит данные для будущих push

## Вариант 2: Использование SSH

1. Переключите remote на SSH:
   ```bash
   git remote set-url origin git@github.com:VladMixline/multisite.git
   ```

2. Настройте SSH ключи (если еще не настроены):
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

3. Добавьте публичный ключ в GitHub (Settings → SSH and GPG keys)

## Текущий статус

Коммиты создаются автоматически после каждого изменения.
Push требует настройки аутентификации один раз.

После настройки аутентификации, все последующие push будут работать автоматически.


