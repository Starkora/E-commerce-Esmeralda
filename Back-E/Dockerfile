# Usa una imagen oficial de PHP con extensiones necesarias
FROM php:8.2-fpm

# Instala dependencias del sistema y Composer
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instala Composer
COPY --from=composer:2.6 /usr/bin/composer /usr/bin/composer

# Copia el código de la app
WORKDIR /var/www/html
COPY . .

# Instala dependencias de Laravel
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Genera la clave de la app si no existe
RUN php artisan key:generate || true

# Da permisos a storage y bootstrap/cache
RUN chown -R www-data:www-data storage bootstrap/cache

# Expone el puerto 8080
EXPOSE 8080

# Comando para iniciar Laravel
CMD php artisan serve --host=0.0.0.0 --port=8080
