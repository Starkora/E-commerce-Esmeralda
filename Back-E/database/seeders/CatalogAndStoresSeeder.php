<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Store;
use Illuminate\Support\Str;

class CatalogAndStoresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Categories
        $categories = [
            ['name' => 'Vestidos', 'icon' => 'FaTshirt', 'order' => 1],
            ['name' => 'Blusas', 'icon' => 'FaTshirt', 'order' => 2],
            ['name' => 'Pantalones', 'icon' => 'FaTshirt', 'order' => 3],
            ['name' => 'Faldas', 'icon' => 'FaTshirt', 'order' => 4],
            ['name' => 'Zapatos', 'icon' => 'FaShoePrints', 'order' => 5],
            ['name' => 'Accesorios', 'icon' => 'FaGem', 'order' => 6],
            ['name' => 'Abrigos', 'icon' => 'FaTshirt', 'order' => 7],
            ['name' => 'Deportivo', 'icon' => 'FaTshirt', 'order' => 8],
        ];

        foreach ($categories as $cat) {
            Category::create([
                'name' => $cat['name'],
                'slug' => Str::slug($cat['name']),
                'description' => "Categoría de {$cat['name']}",
                'icon' => $cat['icon'],
                'order' => $cat['order'],
                'is_active' => true,
            ]);
        }

        // Create Products
        $products = [
            [
                'name' => 'Vestido Elegante de Noche',
                'description' => 'Hermoso vestido elegante perfecto para eventos formales y ocasiones especiales.',
                'price' => 289.99,
                'old_price' => 399.99,
                'sku' => 'VEST-001',
                'stock' => 15,
                'category' => 'Vestidos',
                'badge' => 'Nuevo',
                'badge_color' => 'green',
                'is_featured' => true,
                'rating' => 4.8,
                'review_count' => 156,
            ],
            [
                'name' => 'Blusa Casual con Estampado Floral',
                'description' => 'Blusa ligera y fresca con hermoso estampado floral, ideal para el día a día.',
                'price' => 89.99,
                'old_price' => 129.99,
                'sku' => 'BLUSA-001',
                'stock' => 25,
                'category' => 'Blusas',
                'badge' => 'Oferta',
                'badge_color' => 'red',
                'is_featured' => true,
                'rating' => 4.5,
                'review_count' => 89,
            ],
            [
                'name' => 'Pantalón de Vestir Negro',
                'description' => 'Pantalón clásico de vestir en color negro, corte moderno y elegante.',
                'price' => 159.99,
                'old_price' => null,
                'sku' => 'PANT-001',
                'stock' => 20,
                'category' => 'Pantalones',
                'badge' => null,
                'badge_color' => null,
                'is_featured' => false,
                'rating' => 4.7,
                'review_count' => 234,
            ],
            [
                'name' => 'Zapatos de Tacón Alto',
                'description' => 'Elegantes zapatos de tacón alto en cuero genuino, perfectos para cualquier ocasión.',
                'price' => 199.99,
                'old_price' => 279.99,
                'sku' => 'ZAP-001',
                'stock' => 12,
                'category' => 'Zapatos',
                'badge' => 'Popular',
                'badge_color' => 'orange',
                'is_featured' => true,
                'rating' => 4.9,
                'review_count' => 312,
            ],
            [
                'name' => 'Collar de Perlas Elegante',
                'description' => 'Collar de perlas auténticas con cierre de plata, un accesorio atemporal.',
                'price' => 349.99,
                'old_price' => null,
                'sku' => 'ACC-001',
                'stock' => 8,
                'category' => 'Accesorios',
                'badge' => 'Exclusivo',
                'badge_color' => 'blue',
                'is_featured' => true,
                'rating' => 4.6,
                'review_count' => 67,
            ],
            [
                'name' => 'Falda Midi Plisada',
                'description' => 'Falda midi con pliegues elegantes, versátil y cómoda para uso diario.',
                'price' => 119.99,
                'old_price' => 179.99,
                'sku' => 'FALD-001',
                'stock' => 0,
                'category' => 'Faldas',
                'badge' => null,
                'badge_color' => null,
                'is_featured' => false,
                'rating' => 4.4,
                'review_count' => 145,
            ],
            [
                'name' => 'Abrigo de Lana Premium',
                'description' => 'Abrigo de lana de alta calidad, perfecto para el invierno con estilo sofisticado.',
                'price' => 459.99,
                'old_price' => null,
                'sku' => 'ABR-001',
                'stock' => 10,
                'category' => 'Abrigos',
                'badge' => 'Premium',
                'badge_color' => 'blue',
                'is_featured' => true,
                'rating' => 4.9,
                'review_count' => 198,
            ],
            [
                'name' => 'Conjunto Deportivo',
                'description' => 'Conjunto deportivo cómodo y moderno, ideal para ejercicio o uso casual.',
                'price' => 139.99,
                'old_price' => 189.99,
                'sku' => 'DEP-001',
                'stock' => 30,
                'category' => 'Deportivo',
                'badge' => 'Oferta',
                'badge_color' => 'red',
                'is_featured' => false,
                'rating' => 4.3,
                'review_count' => 421,
            ],
        ];

        foreach ($products as $prod) {
            $category = Category::where('name', $prod['category'])->first();
            
            $product = Product::create([
                'name' => $prod['name'],
                'slug' => Str::slug($prod['name']),
                'description' => $prod['description'],
                'price' => $prod['price'],
                'old_price' => $prod['old_price'],
                'sku' => $prod['sku'],
                'stock' => $prod['stock'],
                'category_id' => $category->id,
                'badge' => $prod['badge'],
                'badge_color' => $prod['badge_color'],
                'is_featured' => $prod['is_featured'],
                'is_active' => true,
                'rating' => $prod['rating'],
                'review_count' => $prod['review_count'],
            ]);

            // Create product image
            ProductImage::create([
                'product_id' => $product->id,
                'image_url' => '/assets/products/' . strtolower($prod['category']) . '1.jpg',
                'order' => 1,
                'is_primary' => true,
            ]);
        }

        // Create Stores
        $stores = [
            [
                'name' => 'Estilo Esmeralda - Miraflores',
                'address' => 'Av. Larco 1234, Centro Comercial Larcomar',
                'city' => 'Lima',
                'phone' => '+51 987 654 321',
                'weekday_hours' => '10:00 - 21:00',
                'weekend_hours' => '10:00 - 22:00',
                'map_url' => 'https://maps.google.com/?q=Larcomar+Miraflores',
                'is_featured' => true,
                'features' => ['parking' => true, 'wifi' => true, 'wheelchair' => true, 'credit_card' => true],
            ],
            [
                'name' => 'Estilo Esmeralda - San Isidro',
                'address' => 'Av. Conquistadores 890, Plaza San Miguel',
                'city' => 'Lima',
                'phone' => '+51 987 654 322',
                'weekday_hours' => '09:00 - 20:00',
                'weekend_hours' => '10:00 - 20:00',
                'map_url' => 'https://maps.google.com/?q=San+Isidro+Lima',
                'is_featured' => false,
                'features' => ['parking' => true, 'wifi' => true, 'wheelchair' => true, 'credit_card' => true],
            ],
            [
                'name' => 'Estilo Esmeralda - Arequipa Centro',
                'address' => 'Portal de Flores 123, Plaza de Armas',
                'city' => 'Arequipa',
                'phone' => '+51 987 654 323',
                'weekday_hours' => '09:00 - 20:00',
                'weekend_hours' => '10:00 - 19:00',
                'map_url' => 'https://maps.google.com/?q=Plaza+Armas+Arequipa',
                'is_featured' => false,
                'features' => ['wifi' => true, 'wheelchair' => false, 'credit_card' => true],
            ],
            [
                'name' => 'Estilo Esmeralda - Cusco',
                'address' => 'Av. El Sol 456, Centro Histórico',
                'city' => 'Cusco',
                'phone' => '+51 987 654 324',
                'weekday_hours' => '09:00 - 19:00',
                'weekend_hours' => '10:00 - 18:00',
                'map_url' => 'https://maps.google.com/?q=Centro+Cusco',
                'is_featured' => false,
                'features' => ['wifi' => true, 'wheelchair' => true, 'credit_card' => true],
            ],
            [
                'name' => 'Estilo Esmeralda - Trujillo',
                'address' => 'Jr. Pizarro 789, Centro Comercial Mall Aventura',
                'city' => 'Trujillo',
                'phone' => '+51 987 654 325',
                'weekday_hours' => '10:00 - 21:00',
                'weekend_hours' => '10:00 - 21:00',
                'map_url' => 'https://maps.google.com/?q=Mall+Aventura+Trujillo',
                'is_featured' => false,
                'features' => ['parking' => true, 'wifi' => true, 'wheelchair' => true, 'credit_card' => true],
            ],
            [
                'name' => 'Estilo Esmeralda - Chiclayo',
                'address' => 'Av. Balta 234, Real Plaza Chiclayo',
                'city' => 'Chiclayo',
                'phone' => '+51 987 654 326',
                'weekday_hours' => '10:00 - 21:00',
                'weekend_hours' => '10:00 - 21:00',
                'map_url' => 'https://maps.google.com/?q=Real+Plaza+Chiclayo',
                'is_featured' => false,
                'features' => ['parking' => true, 'wifi' => true, 'wheelchair' => true, 'credit_card' => true],
            ],
        ];

        foreach ($stores as $store) {
            Store::create([
                'name' => $store['name'],
                'slug' => Str::slug($store['name']),
                'address' => $store['address'],
                'city' => $store['city'],
                'phone' => $store['phone'],
                'weekday_hours' => $store['weekday_hours'],
                'weekend_hours' => $store['weekend_hours'],
                'map_url' => $store['map_url'],
                'image_url' => '/assets/stores/store' . rand(1, 6) . '.jpg',
                'is_featured' => $store['is_featured'],
                'is_active' => true,
                'features' => $store['features'],
            ]);
        }
    }
}
