#!/bin/sh
set -eu

APP_DIR="${APP_DIR:-$(pwd)}"

cd "$APP_DIR"

if [ ! -f ".env.production" ]; then
  echo ".env.production not found in $APP_DIR" >&2
  exit 1
fi

mkdir -p public/uploads/images public/uploads/documents

docker compose --env-file .env.production up -d --build --remove-orphans
docker compose --env-file .env.production ps
