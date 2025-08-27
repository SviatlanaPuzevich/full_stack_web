#!/bin/bash
set -e

echo "🚫 Останавливаю все контейнеры..."
docker stop $(docker ps -aq) 2>/dev/null || true

echo "🗑 Удаляю все контейнеры..."
docker rm -f $(docker ps -aq) 2>/dev/null || true

echo "📦 Удаляю все неиспользуемые образы..."
docker image prune -af

echo "🗂 Чищу volumes..."
docker volume prune -f

echo "🔗 Чищу сети..."
docker network prune -f

echo "💣 Перезапускаю WSL..."
wsl --shutdown

echo "✅ Готово! Теперь запусти Docker Desktop и выполни:"
echo "docker compose -f docker-compose.dev.yml up --build --remove-orphans"

