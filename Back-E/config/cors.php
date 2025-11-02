<?php

return [
    'paths' => [
        'api/*',
        'login',
        'logout',
        'register',
        'spa-register',
    'spa-login',
    'spa-logout',
    'spa-forgot-password',
    'spa-reset-password',
        'sanctum/csrf-cookie',
        'csrf-token',
        'forgot-password',
        'reset-password',
        'user',
        'email/*'
    ],

    'allowed_methods' => ['*'],

    // Allow configuring origins via env. Comma-separated list, e.g. "https://foo.app,https://bar.app"
    'allowed_origins' => explode(',', env('CORS_ALLOWED_ORIGINS', 'https://e-commerce-esmeralda.vercel.app,http://localhost:3000,https://localhost:3000')),
    'allowed_origin_patterns' => [],

    'allowed_headers' => ['*'],

    // Required for Sanctum cookie-based auth across domains
    'supports_credentials' => true,
];
