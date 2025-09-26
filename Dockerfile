FROM bitnami/laravel

# Add MySQL client
USER root

# Install MySQL client (needed for mysqladmin)
RUN apt-get update && apt-get install -y default-mysql-client && rm -rf /var/lib/apt/lists/*

# Copy full Laravel project into /app
COPY ./server /app
COPY ./entrypoint.sh /entrypoint.sh

# Set working directory to Laravel root (inside /app)
WORKDIR /app

# Make script executable
RUN chmod +x /entrypoint.sh

# Install dependencies and fix permissions
RUN composer install --optimize-autoloader
RUN chown -R www-data:www-data /app

# Set entrypoint
ENTRYPOINT ["/entrypoint.sh"]