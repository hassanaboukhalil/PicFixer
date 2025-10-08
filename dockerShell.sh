#!/bin/bash

# Wait until MySQL is ready
until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" --silent; do
  echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."
  sleep 10
done

echo "✅ MySQL is ready."

echo "Using existing .env"

# Cache config and routes
php artisan config:cache
php artisan route:cache

# Run any new migrations (use --force to avoid prompt)
php artisan migrate --force

echo "✅ Laravel setup complete. Starting Apache..."

# Start Apache in the foreground
exec apache2-foreground