#!/bin/bash
set -e

# Set environment variables based on docker-compose configuration
export DB_HOST=database
export DB_PORT=3306
export DB_DATABASE=picfixer
export DB_USERNAME=root
export DB_PASSWORD=12345678

# Wait until MySQL is ready
until mysqladmin ping -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USERNAME" -p"$DB_PASSWORD" --silent; do
  echo "Waiting for MySQL at $DB_HOST:$DB_PORT..."
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