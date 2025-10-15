<?php

return [
    'paths' => [
        'api/*',
        'login',
        'logout',
        'register',
        'spa-register',
        'sanctum/csrf-cookie',
        'forgot-password',
        'reset-password',
        'user'
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
        'https://e-commerce-esmeralda.vercel.app',
    ],

    'allowed_origin_patterns' => ['*'],

    'allowed_headers' => ['*'],

    'supports_credentials' => true,
];
