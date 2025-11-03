# API Documentation - Estilo Esmeralda

## Configuración Inicial

### 1. Ejecutar Migraciones
```bash
php artisan migrate
```

### 2. Ejecutar Seeders (Datos de Prueba)
```bash
php artisan db:seed --class=CatalogAndStoresSeeder
```

## Endpoints Disponibles

### 📦 Products (Productos)

#### GET `/api/products`
Obtener lista de productos con filtros y paginación.

**Parámetros de Query:**
- `search` (string, opcional): Búsqueda por nombre, descripción o SKU
- `category_id` (integer, opcional): Filtrar por categoría
- `min_price` (decimal, opcional): Precio mínimo
- `max_price` (decimal, opcional): Precio máximo
- `in_stock` (boolean, opcional): Solo productos con stock
- `featured` (boolean, opcional): Solo productos destacados
- `sort_by` (string, opcional): Ordenamiento
  - `featured` (default)
  - `price-low` (precio ascendente)
  - `price-high` (precio descendente)
  - `name` (nombre A-Z)
  - `rating` (mejor calificados)
  - `newest` (más recientes)
- `per_page` (integer, opcional): Productos por página (default: 12)

**Ejemplo:**
```
GET /api/products?search=vestido&category_id=1&sort_by=price-low&per_page=12
```

**Respuesta:**
```json
{
  "current_page": 1,
  "data": [
    {
      "id": 1,
      "name": "Vestido Elegante de Noche",
      "slug": "vestido-elegante-de-noche",
      "description": "Hermoso vestido elegante...",
      "price": "289.99",
      "old_price": "399.99",
      "sku": "VEST-001",
      "stock": 15,
      "is_active": true,
      "is_featured": true,
      "category_id": 1,
      "badge": "Nuevo",
      "badge_color": "green",
      "rating": "4.8",
      "review_count": 156,
      "in_stock": true,
      "discount_percentage": 28,
      "primary_image": "/assets/products/vestidos1.jpg",
      "category": {
        "id": 1,
        "name": "Vestidos",
        "slug": "vestidos"
      },
      "images": [
        {
          "id": 1,
          "product_id": 1,
          "image_url": "/assets/products/vestidos1.jpg",
          "order": 1,
          "is_primary": true
        }
      ]
    }
  ],
  "per_page": 12,
  "total": 50
}
```

#### GET `/api/products/{id}`
Obtener detalles de un producto específico.

**Respuesta:** Objeto de producto con categoría e imágenes.

#### GET `/api/products/statistics`
Obtener estadísticas generales de productos.

**Respuesta:**
```json
{
  "total_products": 500,
  "in_stock": 450,
  "featured": 50,
  "average_rating": 4.6,
  "average_discount": 25
}
```

#### GET `/api/products/featured`
Obtener productos destacados.

**Parámetros:**
- `limit` (integer, opcional): Cantidad de productos (default: 8)

#### GET `/api/products/{id}/related`
Obtener productos relacionados (misma categoría).

**Parámetros:**
- `limit` (integer, opcional): Cantidad de productos (default: 4)

---

### 🏷️ Categories (Categorías)

#### GET `/api/categories`
Obtener lista de categorías.

**Parámetros:**
- `with_count` (boolean, opcional): Incluir conteo de productos

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Vestidos",
    "slug": "vestidos",
    "description": "Categoría de Vestidos",
    "icon": "FaTshirt",
    "order": 1,
    "is_active": true,
    "products_count": 45
  }
]
```

#### GET `/api/categories/{id}`
Obtener detalles de una categoría.

#### GET `/api/categories/{id}/products`
Obtener productos de una categoría con paginación.

**Parámetros:**
- `per_page` (integer, opcional): Productos por página (default: 12)

---

### 🏪 Stores (Tiendas)

#### GET `/api/stores`
Obtener lista de tiendas.

**Parámetros:**
- `search` (string, opcional): Búsqueda por nombre, dirección o ciudad
- `city` (string, opcional): Filtrar por ciudad
- `featured` (boolean, opcional): Solo tiendas destacadas

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Estilo Esmeralda - Miraflores",
    "slug": "estilo-esmeralda-miraflores",
    "address": "Av. Larco 1234, Centro Comercial Larcomar",
    "city": "Lima",
    "state": null,
    "zip_code": null,
    "phone": "+51 987 654 321",
    "email": null,
    "weekday_hours": "10:00 - 21:00",
    "weekend_hours": "10:00 - 22:00",
    "latitude": null,
    "longitude": null,
    "map_url": "https://maps.google.com/?q=Larcomar+Miraflores",
    "image_url": "/assets/stores/store1.jpg",
    "is_featured": true,
    "is_active": true,
    "features": {
      "parking": true,
      "wifi": true,
      "wheelchair": true,
      "credit_card": true
    }
  }
]
```

#### GET `/api/stores/{id}`
Obtener detalles de una tienda específica.

#### GET `/api/stores/cities`
Obtener lista de ciudades con tiendas.

**Respuesta:**
```json
["Lima", "Arequipa", "Cusco", "Trujillo", "Chiclayo"]
```

#### GET `/api/stores/statistics`
Obtener estadísticas de tiendas.

**Respuesta:**
```json
{
  "total_stores": 15,
  "cities_count": 8,
  "featured_stores": 2
}
```

#### GET `/api/stores/nearest`
Encontrar tiendas más cercanas por coordenadas.

**Parámetros requeridos:**
- `latitude` (numeric): Latitud
- `longitude` (numeric): Longitud

**Respuesta:** Lista de 5 tiendas más cercanas con distancia en km.

---

## Estructura de Respuestas

### Paginación
Todas las respuestas paginadas incluyen:
```json
{
  "current_page": 1,
  "data": [...],
  "first_page_url": "...",
  "from": 1,
  "last_page": 5,
  "last_page_url": "...",
  "next_page_url": "...",
  "path": "...",
  "per_page": 12,
  "prev_page_url": null,
  "to": 12,
  "total": 50
}
```

### Errores
Todas las respuestas de error incluyen:
```json
{
  "message": "Descripción del error",
  "error": "Detalles técnicos" // Solo en desarrollo
}
```

Códigos de estado HTTP:
- `200` - OK
- `404` - No encontrado
- `422` - Validación fallida
- `500` - Error del servidor

---

## Ejemplos de Uso

### Frontend - Obtener productos para catálogo
```typescript
const fetchProducts = async (filters: {
  search?: string;
  categoryId?: number;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
}) => {
  const params = new URLSearchParams();
  
  if (filters.search) params.append('search', filters.search);
  if (filters.categoryId) params.append('category_id', filters.categoryId.toString());
  if (filters.sortBy) params.append('sort_by', filters.sortBy);
  if (filters.minPrice) params.append('min_price', filters.minPrice.toString());
  if (filters.maxPrice) params.append('max_price', filters.maxPrice.toString());
  if (filters.page) params.append('page', filters.page.toString());
  
  const response = await fetch(`${API_BASE_URL}/api/products?${params}`);
  return await response.json();
};
```

### Frontend - Obtener tiendas
```typescript
const fetchStores = async (city?: string, search?: string) => {
  const params = new URLSearchParams();
  
  if (city && city !== 'Todas') params.append('city', city);
  if (search) params.append('search', search);
  
  const response = await fetch(`${API_BASE_URL}/api/stores?${params}`);
  return await response.json();
};
```

---

## Modelos de Base de Datos

### Products
- `id`, `name`, `slug`, `description`
- `price`, `old_price`, `sku`, `stock`
- `category_id`, `is_active`, `is_featured`
- `badge`, `badge_color`, `rating`, `review_count`
- Relaciones: `category`, `images`
- Soft deletes habilitado

### Categories
- `id`, `name`, `slug`, `description`
- `icon`, `order`, `is_active`
- Relación: `products`

### Product Images
- `id`, `product_id`, `image_url`
- `order`, `is_primary`
- Relación: `product`

### Stores
- `id`, `name`, `slug`, `address`, `city`
- `phone`, `email`, `weekday_hours`, `weekend_hours`
- `latitude`, `longitude`, `map_url`, `image_url`
- `is_featured`, `is_active`, `features` (JSON)

---

## Notas Importantes

1. **Caché**: Se recomienda implementar caché para las listas de categorías y estadísticas.
2. **Imágenes**: Las URLs de imágenes son relativas. Agregar el dominio base en el frontend.
3. **CORS**: Asegurarse de configurar correctamente CORS en `config/cors.php`.
4. **Rate Limiting**: Considerar agregar rate limiting a los endpoints públicos.
5. **Búsqueda**: Para mejor rendimiento con grandes volúmenes, considerar Laravel Scout con Meilisearch/Algolia.
