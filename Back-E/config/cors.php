<?php

return [
    // In development allow CORS headers on all paths so redirects (eg. /dashboard)
    // also include Access-Control-Allow-Origin. For production scope this down.
    'paths' => ['api/*', 'login', 'logout', 'sanctum/csrf-cookie', 'spa-forgot-password', 'spa-reset-password'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
