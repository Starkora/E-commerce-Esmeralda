#!/bin/bash

# Script de inicio para Render
# Ejecuta migraciones y limpia cachés antes de iniciar el servidor

cd /opt/render/project/src/Back-E

echo "🔧 Limpiando cachés..."
php artisan config:clear
php artisan route:clear
php artisan cache:clear

echo "🔄 Ejecutando migraciones..."
php artisan migrate --force

echo "✅ Listo! Iniciando servidor..."

# Inicia el servidor (ajusta según tu configuración)
# Para Apache/Nginx esto no es necesario, pero si usas php artisan serve:
# php artisan serve --host=0.0.0.0 --port=8000
