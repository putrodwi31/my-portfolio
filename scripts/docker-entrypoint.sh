#!/bin/sh
set -eu

mkdir -p /app/data /app/public/uploads/images /app/public/uploads/documents
SEED_MARKER_PATH="${SEED_MARKER_PATH:-/app/data/.seeded}"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required (example: file:/app/data/prod.db)" >&2
  exit 1
fi

if [ "${RUN_DB_PUSH_ON_START:-true}" = "true" ]; then
  npx prisma db push --url "$DATABASE_URL"
fi

if [ "${RUN_DB_SEED_ONCE:-false}" = "true" ] && [ ! -f "$SEED_MARKER_PATH" ]; then
  npm run db:seed
  date -u +"%Y-%m-%dT%H:%M:%SZ" > "$SEED_MARKER_PATH"
elif [ "${RUN_DB_SEED:-false}" = "true" ]; then
  npm run db:seed
fi

exec npm run start
