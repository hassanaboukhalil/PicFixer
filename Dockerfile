FROM bitnami/laravel

# Add MySQL client
USER root

# Install MySQL client (needed for mysqladmin)
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

# Copy full Laravel project into /app/server
COPY ./server /app

# Set working directory to Laravel root (inside /app/server)
WORKDIR /app

# Install dependencies and fix permissions
RUN composer install --optimize-autoloader
RUN chown -R www-data:www-data /app
