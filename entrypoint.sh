#!/bin/bash
set -e

# Wait until MySQL is ready
until mysqladmin ping -h"$LARAVEL_DATABASE_HOST" -P"$LARAVEL_DATABASE_PORT_NUMBER" -u"$LARAVEL_DATABASE_USER" -p"$LARAVEL_DATABASE_PASSWORD" --silent; do
  echo "Waiting for MySQL at $LARAVEL_DATABASE_HOST:$LARAVEL_DATABASE_PORT_NUMBER..."
  sleep 3
done

echo "✅ MySQL is ready."

echo "Using existing .env"

# Cache config and routes
php artisan config:cache
php artisan route:cache

# Run any new migrations (use --force to avoid prompt)
php artisan migrate --force

echo "✅ Laravel setup complete. Starting server..."

# Start Laravel server
php artisan serve --host=0.0.0.0 --port=8000