#!/bin/bash

# Fix permissions for storage and cache dirs (volumes may override Dockerfile settings)
mkdir -p /var/www/html/storage/logs
mkdir -p /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Ensure Laravel storage symlink exists
php artisan storage:link || true

# Start Supervisor (PHP-FPM + Nginx)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
