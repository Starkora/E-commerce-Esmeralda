# Instrucciones de Despliegue para Backend Laravel

## Problema Actual
Error 500 al intentar cargar productos desde `/api/products`

## Causa
La base de datos no tiene datos porque el seeder no se ha ejecutado en el servidor de producción.

## Solución

### Opción 1: Ejecutar comandos en Render.com (Recomendado)

1. Ve a tu dashboard de Render.com
2. Selecciona tu servicio web del backend
3. Ve a la pestaña "Shell" o "Console"
4. Ejecuta los siguientes comandos:

```bash
# Ejecutar migraciones
php artisan migrate --force

# Ejecutar seeders
php artisan db:seed --force

# O ejecutar ambos a la vez
php artisan migrate:fresh --seed --force
```

**⚠️ ADVERTENCIA:** `migrate:fresh` eliminará todos los datos existentes. Si ya tienes datos importantes, usa solo `migrate` y `db:seed`.

### Opción 2: Verificar datos manualmente

Ejecuta este comando para verificar si hay productos:

```bash
php artisan tinker
```

Luego dentro de tinker:
```php
\App\Models\Product::count();
\App\Models\Category::count();
\App\Models\Store::count();
```

Si todos devuelven 0, necesitas ejecutar el seeder.

### Opción 3: Configurar seeding automático en deploy

Agrega al archivo `build.sh` o comando de build en Render:

```bash
#!/usr/bin/env bash

# Instalar dependencias
composer install --no-dev --optimize-autoloader

# Optimizar carga de clases
php artisan optimize

# Ejecutar migraciones (solo en primera vez o cuando cambien)
php artisan migrate --force

# Ejecutar seeders (solo si la DB está vacía)
php artisan db:seed --force --class=CatalogAndStoresSeeder
```

### Opción 4: Verificar logs del servidor

Para ver el error exacto, revisa los logs:

```bash
tail -f storage/logs/laravel.log
```

O en Render.com, ve a la pestaña "Logs" para ver el error completo.

## Verificación

Después de ejecutar los seeders, verifica que funcionó:

```bash
curl https://e-commerce-esmeralda.onrender.com/api/products
curl https://e-commerce-esmeralda.onrender.com/api/categories
curl https://e-commerce-esmeralda.onrender.com/api/stores
```

## Solución Rápida para el Frontend

Mientras se arregla el backend, puedes temporalmente usar datos mock en el frontend agregando un fallback:

```typescript
useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBase}/api/products?${params}`);
      if (!response.ok) throw new Error('Error al cargar productos');
      
      const data = await response.json();
      setProducts(data.data || data);
    } catch (err: any) {
      console.error('Error loading products:', err);
      setError(err.message);
      
      // TEMPORAL: Usar datos mock si falla el API
      setProducts([/* datos mock aquí */]);
    } finally {
      setLoading(false);
    }
  };
  
  fetchProducts();
}, [searchQuery, activeCategory, sortBy, priceRange, categories, apiBase]);
```

## Archivos Modificados

### Backend
- ✅ `app/Models/Product.php` - Optimizado accessor `primary_image`
- ✅ `database/seeders/DatabaseSeeder.php` - Agregado llamado a CatalogAndStoresSeeder
- ✅ `app/Http/Controllers/Api/ProductController.php` - Ya incluye manejo de errores

### Frontend
- ✅ `pages/catalog.tsx` - Conectado con API
- ✅ `pages/stores.tsx` - Conectado con API

## Próximos Pasos

1. **URGENTE**: Ejecutar `php artisan db:seed --force` en Render.com
2. Verificar que los endpoints respondan correctamente
3. Probar el frontend con datos reales
4. Considerar agregar cache para mejorar performance
5. Configurar monitoring de errores (Sentry, Bugsnag, etc.)

## Contacto

Si el problema persiste después de ejecutar los seeders, verifica:
- ✅ Variable de entorno `DB_CONNECTION` en Render
- ✅ Credenciales de la base de datos
- ✅ Conexión entre el servidor web y la base de datos
- ✅ Logs de error en Render.com dashboard
