FROM bitnami/laravel

WORKDIR /app

# Copy full Laravel project into /app/server
COPY ./server /app/server

# Set working directory to Laravel root (inside /app/server)
WORKDIR /app/server

# Install dependencies and fix permissions
RUN composer install --optimize-autoloader
RUN chown -R www-data:www-data /app/server
